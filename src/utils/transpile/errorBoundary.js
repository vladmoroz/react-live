import React, { Component } from 'react';

const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends Component {
    constructor() {
      super();
      this.checkValidity();
    }

    componentDidCatch(error) {
      errorCallback(error);
    }

    componentDidUpdate() {
      this.checkValidity();
    }

    checkValidity() {
      try {
        const isValid =
          this.isValidNode() ||
          this.isClassComponent() ||
          React.isValidElement(<Element />);

        if (!isValid) {
          throw new Error(`${Element} is not a valid React child`);
        }
      } catch (error) {
        errorCallback(new Error(`${Element} is not a valid React child`));
      }
    }

    isValidNode() {
      return (
        React.isValidElement(Element) ||
        typeof Element === 'boolean' ||
        typeof Element === 'number' ||
        typeof Element === 'string' ||
        Element === null
      );
    }

    isClassComponent() {
      return Element.prototype instanceof Component;
    }

    render() {
      if (this.isValidNode()) {
        return Element;
      }

      try {
        if (this.isClassComponent() || React.isValidElement(<Element />)) {
          return <Element />;
        }
      } catch (error) {
        return null;
      }

      return null;
    }
  };
};

export default errorBoundary;
