import { transform as _transform } from 'sucrase';

const opts = {
  transforms: ['jsx', 'typescript'],
};

export default (code) => _transform(code, opts).code;
