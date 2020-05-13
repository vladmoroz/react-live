import {
  LiveProvider,
  LiveError,
  LivePreview,
  LiveContext,
  withLive,
} from '../';
import * as React from 'react';

export const providerC = (
  <LiveProvider
    code="code"
    className="class"
    scope={{ Component: React.Component }}
    transformCode={(code: string): string => code + ';;'}
    noInline={false}
  />
);

export const liveErrorC = <LiveError />;

export const customError = () => (
  <LiveContext.Consumer>
    {({ error }) => (error ? <pre>{error}</pre> : null)}
  </LiveContext.Consumer>
);

export const livePreviewC = <LivePreview />;

const Component: React.StatelessComponent<{}> = () => <div>Hello World!</div>;

export const wrappedComponent = withLive(Component);
