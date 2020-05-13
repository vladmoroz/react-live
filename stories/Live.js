import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import { LiveProvider, LiveError, LivePreview, withLive } from '../src/index';

const defaultExample = `
<strong>
  Hello World!
    Next Indent Level
</strong>
`.trim();

const functionExample = `
() => (
  <h3>
    So functional. Much wow!
  </h3>
)
`.trim();

const componentExample = `
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <center>
        <h3>
          {this.state.count}
        </h3>
      </center>
    )
  }
}
`.trim();

const hooksExample = `
function LikeButton() {
  const [likes, increaseLikes] = React.useState(0)

  return (
    <>
      <p className="likes">{likes} likes</p>
      <button
        className="button"
        onClick={() => increaseLikes(likes + 1)} />
    </>
  )
}
`.trim();

const StyledLivePreview = styled(LivePreview)`
  background: green;
  color: white;
  padding: 3px;
`;
const StyledTextarea = styled.textarea`
  height: 300px;
  width: 100%;
  font-family: monospace;
  font-size: 16px;
  white-space: pre;
  background: #322e3c;
  color: white;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background: lavender;
  height: 600px;

  & > .button {
    background-color: rgb(166, 187, 255);
    border-bottom: 6px inset rgba(0, 0, 0, 0.3);
    border-left: 6px inset rgba(0, 0, 0, 0.3);
    border-right: 6px inset rgba(255, 255, 255, 0.5);
    border-top: 6px inset rgba(255, 255, 255, 0.5);
    padding: 20;

    &:active {
      border-top: 6px inset rgba(0, 0, 0, 0.3);
      border-right: 6px inset rgba(0, 0, 0, 0.3);
      border-bottom: 6px inset rgba(255, 255, 255, 0.5);
      border-left: 6px inset rgba(255, 255, 255, 0.5);

      outline: none;
    }

    &:focus {
      background-color: lightseagreen;
      outline: none;
    }

    &:before {
      content: '💛';
      font-size: 30px;
    }
  }

  & > .pink {
    background-color: pink;
  }

  & > .likes {
    font-family: monospace;
    font-size: 18px;
  }
`;
const TestComponent = ({ live }) => {
  const Result = live.element;
  return (
    <Container>
      <pre>{live.code}</pre>
      <pre>{live.error}</pre>
      <Result />
    </Container>
  );
};
const LiveComponent = withLive(TestComponent);
function Sandbox() {
  const initialCode = `
    <em>We're using a custom onChange event on the editor to update the code</em>
  `.trim();
  const [code, setCode] = React.useState(initialCode);
  return (
    <LiveProvider
      code={code}
      disabled={boolean('Disable editing', false)}
      noInline={boolean('No inline evaluation', false)}
    >
      <StyledTextarea
        onChange={(event) => setCode(event.target.value)}
        defaultValue={code}
      />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
}
storiesOf('Live', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const [code, setCode] = React.useState(defaultExample);
    return (
      <LiveProvider
        code={code}
        disabled={boolean('Disable editing', false)}
        noInline={boolean('No inline evaluation', false)}
      >
        <StyledTextarea
          onChange={(event) => setCode(event.target.value)}
          defaultValue={code}
        />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  })
  .add('function example', () => {
    const [code, setCode] = React.useState(functionExample);
    return (
      <LiveProvider
        code={code}
        disabled={boolean('Disable editing', false)}
        noInline={boolean('No inline evaluation', false)}
      >
        <StyledTextarea
          onChange={(event) => setCode(event.target.value)}
          defaultValue={code}
        />
        <LiveError />
        <StyledLivePreview />
      </LiveProvider>
    );
  })
  .add('styled subcomponents', () => {
    const [code, setCode] = React.useState(defaultExample);
    return (
      <LiveProvider
        code={code}
        disabled={boolean('Disable editing', false)}
        noInline={boolean('No inline evaluation', false)}
      >
        <StyledTextarea
          onChange={(event) => setCode(event.target.value)}
          defaultValue={code}
        />
        <LiveError />
        <StyledLivePreview />
      </LiveProvider>
    );
  })
  .add('component example', () => {
    const [code, setCode] = React.useState(componentExample);
    return (
      <LiveProvider
        code={code}
        disabled={boolean('Disable editing', false)}
        noInline={boolean('No inline evaluation', false)}
      >
        <StyledTextarea
          onChange={(event) => setCode(event.target.value)}
          defaultValue={code}
        />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  })
  .add('component with custom onChange', () => <Sandbox />)
  .add('withLive example', () => {
    return (
      <LiveProvider code={hooksExample}>
        <LiveComponent />
      </LiveProvider>
    );
  });
