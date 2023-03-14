import { render } from '@testing-library/react';
import { MyButton } from './MyButton';
import renderer from 'react-test-renderer';

describe('test MyButton', () => {
  it('should include text', () => {
    const { container } = render(<MyButton>click</MyButton>);
    const com = container.firstChild as HTMLElement;
    expect(com.tagName).toBe('BUTTON');
    expect(com.textContent).toBe('click');
  });
  it('should match snapshot', () => {
    const btn = renderer.create(<MyButton>click</MyButton>).toJSON();
    expect(btn).toMatchSnapshot();
  });
});
