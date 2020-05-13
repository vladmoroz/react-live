import React from 'react';

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  // eslint-disable-next-line no-new-func
  const res = new Function('Object', 'React', ...scopeKeys, code);
  return res(Object, React, ...scopeValues);
};

export default evalCode;
