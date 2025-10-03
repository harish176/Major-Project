import React, { createContext, useContext, useState, useCallback } from 'react';import React, { createContext, useContext, useState, useCallback } from 'react';import React, { createContext, useContext, useState, useCallback } from 'react';

import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export const useToast = () => {

  const context = useContext(ToastContext);const ToastContext = createContext();

  if (!context) {

    throw new Error('useToast must be used within a ToastProvider');// Toast Context

  }

  return context;export const useToast = () => {const ToastContext = createContext();

};

  const context = useContext(ToastContext);

const Toast = ({ toast, onRemove }) => {

  const getIcon = () => {  if (!context) {// Toast Types

    switch (toast.type) {

      case 'success':    throw new Error('useToast must be used within a ToastProvider');export const TOAST_TYPES = {

        return <FaCheckCircle className="text-green-500" />;

      case 'error':  }  SUCCESS: 'success',

        return <FaExclamationCircle className="text-red-500" />;

      case 'warning':  return context;  ERROR: 'error',

        return <FaExclamationCircle className="text-yellow-500" />;

      case 'loading':};  INFO: 'info',

        return (

          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>  WARNING: 'warning',

        );

      default:const Toast = ({ toast, onRemove }) => {  LOADING: 'loading'

        return <FaInfoCircle className="text-blue-500" />;

    }  const getIcon = () => {};

  };

    switch (toast.type) {

  const getBorderColor = () => {

    switch (toast.type) {      case 'success':// Toast Component

      case 'success':

        return 'border-green-500';        return <FaCheckCircle className="text-green-500" />;const Toast = ({ toast, onRemove }) => {

      case 'error':

        return 'border-red-500';      case 'error':  const getIcon = () => {

      case 'warning':

        return 'border-yellow-500';        return <FaExclamationCircle className="text-red-500" />;    switch (toast.type) {

      case 'loading':

        return 'border-blue-500';      case 'warning':      case TOAST_TYPES.SUCCESS:

      default:

        return 'border-blue-500';        return <FaExclamationCircle className="text-yellow-500" />;        return <FaCheckCircle className="text-green-500" />;

    }

  };      case 'loading':      case TOAST_TYPES.ERROR:



  return (        return (        return <FaExclamationCircle className="text-red-500" />;

    <div className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor()} max-w-sm mb-2 transition-all duration-300 transform translate-x-0`}>

      <div className="flex-shrink-0">          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>      case TOAST_TYPES.WARNING:

        {getIcon()}

      </div>        );        return <FaExclamationCircle className="text-yellow-500" />;

      <div className="flex-1">

        <p className="text-gray-800 text-sm font-medium">{toast.message}</p>      default:      case TOAST_TYPES.LOADING:

      </div>

      {toast.type !== 'loading' && (        return <FaInfoCircle className="text-blue-500" />;        return (

        <button

          onClick={() => onRemove(toast.id)}    }          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>

          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"

        >  };        );

          <FaTimes size={14} />

        </button>      default:

      )}

    </div>  const getBorderColor = () => {        return <FaInfoCircle className="text-blue-500" />;

  );

};    switch (toast.type) {    }



export const ToastProvider = ({ children }) => {      case 'success':  };

  const [toasts, setToasts] = useState([]);

        return 'border-green-500';

  const addToast = useCallback((message, type = 'info', duration = 4000) => {

    const id = Date.now() + Math.random();      case 'error':  const getBorderColor = () => {

    const newToast = { id, message, type, duration };

            return 'border-red-500';    switch (toast.type) {

    setToasts(prev => [...prev, newToast]);

      case 'warning':      case TOAST_TYPES.SUCCESS:

    if (type !== 'loading' && duration > 0) {

      setTimeout(() => {        return 'border-yellow-500';        return 'border-green-500';

        removeToast(id);

      }, duration);      case 'loading':      case TOAST_TYPES.ERROR:

    }

        return 'border-blue-500';        return 'border-red-500';

    return id;

  }, []);      default:      case TOAST_TYPES.WARNING:



  const removeToast = useCallback((id) => {        return 'border-blue-500';        return 'border-yellow-500';

    setToasts(prev => prev.filter(toast => toast.id !== id));

  }, []);    }      case TOAST_TYPES.LOADING:



  const removeAllToasts = useCallback(() => {  };        return 'border-blue-500';

    setToasts([]);

  }, []);      default:



  const value = {  return (        return 'border-blue-500';

    toasts,

    addToast,    <div className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor()} max-w-sm mb-2 animate-slide-in`}>    }

    removeToast,

    removeAllToasts      <div className="flex-shrink-0">  };

  };

        {getIcon()}

  return (

    <ToastContext.Provider value={value}>      </div>  return (

      {children}

      <div className="fixed top-4 right-4 z-[9999] space-y-2">      <div className="flex-1">    <motion.div

        {toasts.map(toast => (

          <Toast        <p className="text-gray-800 text-sm font-medium">{toast.message}</p>      initial={{ opacity: 0, x: 300, scale: 0.8 }}

            key={toast.id}

            toast={toast}      </div>      animate={{ opacity: 1, x: 0, scale: 1 }}

            onRemove={removeToast}

          />      {toast.type !== 'loading' && (      exit={{ opacity: 0, x: 300, scale: 0.8 }}

        ))}

      </div>        <button      transition={{ duration: 0.3, ease: "easeOut" }}

    </ToastContext.Provider>

  );          onClick={() => onRemove(toast.id)}      className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg border-l-4 ${getBorderColor()} max-w-sm`}

};
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"    >

        >      <div className="flex-shrink-0">

          <FaTimes size={14} />        {getIcon()}

        </button>      </div>

      )}      <div className="flex-1">

    </div>        <p className="text-gray-800 text-sm font-medium">{toast.message}</p>

  );      </div>

};      {toast.type !== TOAST_TYPES.LOADING && (

        <button

export const ToastProvider = ({ children }) => {          onClick={() => onRemove(toast.id)}

  const [toasts, setToasts] = useState([]);          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"

        >

  const addToast = useCallback((message, type = 'info', duration = 4000) => {          <FaTimes size={14} />

    const id = Date.now() + Math.random();        </button>

    const newToast = { id, message, type, duration };      )}

        </motion.div>

    setToasts(prev => [...prev, newToast]);  );

};

    if (type !== 'loading' && duration > 0) {

      setTimeout(() => {// Toast Container

        removeToast(id);const ToastContainer = ({ toasts, removeToast }) => {

      }, duration);  return (

    }    <div className="fixed top-4 right-4 z-[9999] space-y-2">

      <AnimatePresence>

    return id;        {toasts.map(toast => (

  }, []);          <Toast

            key={toast.id}

  const removeToast = useCallback((id) => {            toast={toast}

    setToasts(prev => prev.filter(toast => toast.id !== id));            onRemove={removeToast}

  }, []);          />

        ))}

  const removeAllToasts = useCallback(() => {      </AnimatePresence>

    setToasts([]);    </div>

  }, []);  );

};

  const value = {

    toasts,// Toast Provider

    addToast,export const ToastProvider = ({ children }) => {

    removeToast,  const [toasts, setToasts] = useState([]);

    removeAllToasts

  };  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 4000) => {

    const id = Date.now() + Math.random();

  return (    const newToast = { id, message, type, duration };

    <ToastContext.Provider value={value}>    

      {children}    setToasts(prev => [...prev, newToast]);

      <div className="fixed top-4 right-4 z-[9999] space-y-2">

        {toasts.map(toast => (    // Auto remove toast after duration (except for loading toasts)

          <Toast    if (type !== TOAST_TYPES.LOADING && duration > 0) {

            key={toast.id}      setTimeout(() => {

            toast={toast}        removeToast(id);

            onRemove={removeToast}      }, duration);

          />    }

        ))}

      </div>    return id;

    </ToastContext.Provider>  }, []);

  );

};  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};