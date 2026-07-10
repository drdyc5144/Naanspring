import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaMicrophone } from "react-icons/fa";

const SearchBar = ({
  placeholder = "Search for products...",
  onSearch,
  onClear,
  className = "",
  size = "md",
  autoFocus = false,
  suggestions = [],
  showSuggestions = true,
  enableVoiceSearch = false, // ← Changed from showVoiceSearch
  variant = "default", // default, outlined, filled
  rounded = "full", // full, md, lg
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVoiceSearchVisible, setIsVoiceSearchVisible] = useState(false); // ← Changed name
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  const sizes = {
    sm: {
      input: "px-3 py-1.5 text-sm",
      icon: "w-4 h-4",
      button: "px-3 py-1.5 text-sm",
    },
    md: {
      input: "px-4 py-2.5 text-base",
      icon: "w-5 h-5",
      button: "px-4 py-2.5 text-base",
    },
    lg: {
      input: "px-5 py-3 text-lg",
      icon: "w-6 h-6",
      button: "px-5 py-3 text-lg",
    },
  };

  const variants = {
    default: {
      wrapper:
        "bg-white border border-gray-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200",
      input: "bg-transparent",
    },
    outlined: {
      wrapper:
        "bg-transparent border-2 border-gray-300 focus-within:border-primary-500",
      input: "bg-transparent",
    },
    filled: {
      wrapper:
        "bg-gray-100 border border-transparent focus-within:bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200",
      input: "bg-transparent",
    },
  };

  const roundedStyles = {
    full: "rounded-full",
    md: "rounded-md",
    lg: "rounded-lg",
  };

  const sizeStyles = sizes[size] || sizes.md;
  const variantStyles = variants[variant] || variants.default;
  const roundedStyle = roundedStyles[rounded] || roundedStyles.full;

  // Check for voice search support
  useEffect(() => {
    if (
      enableVoiceSearch &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsVoiceSearchVisible(true);
    }
  }, [enableVoiceSearch]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
      setIsFocused(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsFocused(false);
    if (onClear) {
      onClear();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    setIsFocused(false);
  };

  const handleVoiceSearch = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Voice search is not supported in your browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      if (onSearch) {
        onSearch(transcript);
      } else {
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const filteredSuggestions =
    query && showSuggestions
      ? suggestions
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            flex items-center gap-2
            ${variantStyles.wrapper}
            ${roundedStyle}
            transition-all duration-200
            ${isFocused ? "shadow-md" : ""}
          `}
        >
          {/* Search Icon */}
          <FaSearch
            className={`
            ${sizeStyles.icon}
            text-gray-400
            ml-3
            ${isFocused ? "text-primary-500" : ""}
          `}
          />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`
              flex-1
              ${sizeStyles.input}
              ${variantStyles.input}
              outline-none
              text-gray-800
              placeholder-gray-400
              min-w-[120px]
            `}
            aria-label="Search"
          />

          {/* Voice Search Button */}
          {isVoiceSearchVisible && (
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`
                p-1.5
                rounded-full
                transition-colors duration-200
                ${
                  isListening
                    ? "text-red-500 bg-red-50 animate-pulse"
                    : "text-gray-400 hover:text-primary-600 hover:bg-primary-50"
                }
              `}
              aria-label="Voice search"
            >
              <FaMicrophone className={sizeStyles.icon} />
            </button>
          )}

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className={`
                p-1
                rounded-full
                text-gray-400
                hover:text-gray-600
                hover:bg-gray-100
                transition-colors duration-200
                mr-1
              `}
              aria-label="Clear search"
            >
              <FaTimes className={sizeStyles.icon} />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className={`
              ${sizeStyles.button}
              bg-primary-600
              text-white
              font-medium
              ${roundedStyle}
              hover:bg-primary-700
              transition-colors duration-200
              px-4
              ${query ? "opacity-100" : "opacity-70"}
            `}
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && query && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FaSearch className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-700">{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
