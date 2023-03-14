import { Button, Card, Descriptions, Input, Space } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { useReducer } from 'react';

interface StateType {
  age: number;
  name: string;
}
enum ActionTypeEnum {
  'ADD' = 'ADD',
  'MINUS' = 'MINUS',
  'ChangeName' = 'ChangeName',
}
type ActionType =
  | {
      type: ActionTypeEnum.ADD | ActionTypeEnum.MINUS;
    }
  | {
      type: ActionTypeEnum.ChangeName;
      nextName: string;
    };
const reducer = (state: StateType, action: ActionType): StateType => {
  if (action.type === ActionTypeEnum.ADD) {
    return {
      name: state.name,
      age: state.age + 1,
    };
  } else if (action.type === ActionTypeEnum.MINUS) {
    if (state.age === 0) {
      return {
        name: state.name,
        age: 0,
      };
    }
    return {
      name: state.name,
      age: state.age - 1,
    };
  } else if (action.type === ActionTypeEnum.ChangeName) {
    return {
      name: action.nextName,
      age: state.age,
    };
  }
  throw Error('Unkown action');
};
export const UseReducerInt = () => {
  const [state, dispatch] = useReducer(reducer, {
    age: 0,
    name: 'zy',
  });
  return (
    <Card title="useReducer基本用法">
      <div>
        <Descriptions>
          <DescriptionsItem label="name">{state.name}</DescriptionsItem>
          <DescriptionsItem label="age">{state.age}</DescriptionsItem>
        </Descriptions>
        <Space>
          <label>changeName:</label>
          <Input
            type="text"
            value={state.name}
            onChange={(e) => {
              const value = e.target.value;
              dispatch({ type: ActionTypeEnum.ChangeName, nextName: value });
            }}
          />
          <Button
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          >
            addAge
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: ActionTypeEnum.MINUS });
            }}
          >
            minusAge
          </Button>
        </Space>
      </div>
    </Card>
  );
};
