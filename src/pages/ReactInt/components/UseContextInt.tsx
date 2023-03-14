import { Button, Card, Input, List } from 'antd';
import React, { useContext, useReducer, useState } from 'react';

const ThemeContext = React.createContext<string | null>(null);
const GrandSon = () => {
  const theme = useContext(ThemeContext);
  let style = { border: '2px solid black' };
  if (theme) {
    style = {
      border: `2px solid ${theme}`,
    };
  }
  return <div style={{ padding: 24, ...style }}>grandSon</div>;
};
const Child = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ border: '2px solid black', padding: 24 }}>
      child{children}
    </div>
  );
};
const Parent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ border: '2px solid black', padding: 24 }}>
      parent{children}
    </div>
  );
};
export const UseContextInt = () => {
  const [theme, setTheme] = useState('#1677ff');
  let style = { border: '1px solid black' };
  if (theme) {
    style = { border: `2px solid ${theme}` };
  }
  return (
    <Card title="useContext基础用法——跨级组件通信">
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 24, ...style }}>
          <span
            style={{ lineHeight: '32px', height: 32, display: 'inline-block' }}
          >
            grandFather
          </span>
          <Input
            type="color"
            style={{
              width: 32,
              padding: 0,
              margin: 0,
              verticalAlign: 'middle',
              marginLeft: 16,
            }}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
          />

          <Parent>
            <Child>
              <GrandSon />
            </Child>
          </Parent>
        </div>
      </ThemeContext.Provider>
    </Card>
  );
};

const TaskContext = React.createContext<TaskStateType[] | null>(null);
const TaskDispatchContext =
  React.createContext<React.Dispatch<TaskActionType> | null>(null);
interface TaskStateType {
  id: number;
  text: string;
  done: boolean;
}
enum TaskActionTypeEnum {
  added = 'added',
  changed = 'changed',
  deleted = 'deleted',
}
type TaskActionType =
  | {
      type: TaskActionTypeEnum.added;
      id: number;
      text: string;
    }
  | {
      type: TaskActionTypeEnum.deleted;
      id: number;
    }
  | {
      type: TaskActionTypeEnum.changed;
      task: TaskStateType;
    };
const taskReducer = (
  tasks: TaskStateType[],
  action: TaskActionType,
): TaskStateType[] => {
  switch (action.type) {
    case 'added':
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    case 'changed':
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    case 'deleted':
      return tasks.filter((t) => t.id !== action.id);
    default:
      throw Error('Unknown action type');
  }
};
const initialTasks = [
  {
    id: 0,
    text: "Philosopher's Path",
    done: true,
  },
  {
    id: 1,
    text: 'Visit the temple',
    done: false,
  },
  {
    id: 2,
    text: 'Drink matcha',
    done: false,
  },
];
let nextId = 3;
const AddTask = () => {
  const [text, setText] = useState('');
  const dispatch = useContext(TaskDispatchContext);
  return (
    <>
      <Input
        value={text}
        style={{ width: 300, marginRight: 16 }}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          if (text !== '') {
            if (dispatch !== null) {
              dispatch({
                type: TaskActionTypeEnum.added,
                id: nextId++,
                text,
              });
              setText('');
            }
          }
        }}
      >
        add
      </Button>
    </>
  );
};
const Task = ({ task }: { task: TaskStateType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TaskDispatchContext);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <Input
          style={{ width: 300, marginRight: 16 }}
          value={task.text}
          onChange={(e) => {
            dispatch?.({
              type: TaskActionTypeEnum.changed,
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <Button
          style={{ marginRight: 16 }}
          onClick={() => {
            setIsEditing(false);
          }}
        >
          save
        </Button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span style={{ userSelect: 'none' }}>{task.text}</span>
        <Button
          style={{ marginRight: 16, marginLeft: 16 }}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </Button>
      </>
    );
  }
  return (
    <label>
      <Input
        type="checkbox"
        style={{ width: 30 }}
        checked={task.done}
        onChange={(e) => {
          dispatch?.({
            type: TaskActionTypeEnum.changed,
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <Button
        danger
        onClick={() => {
          dispatch?.({
            type: TaskActionTypeEnum.deleted,
            id: task.id,
          });
        }}
      >
        delete
      </Button>
    </label>
  );
};
const TaskList = () => {
  const tasks = useContext(TaskContext);
  return (tasks || []).length > 0 ? (
    <List style={{ marginTop: 24 }} bordered>
      {(tasks || []).map((item) => {
        return (
          <List.Item key={item.id}>
            <Task task={item} />
          </List.Item>
        );
      })}
    </List>
  ) : null;
};
export const UseContextCombineUseReducer = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <Card title="useContext和useReducer结合">
      <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          <AddTask />
          <TaskList />
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    </Card>
  );
};

export default UseContextInt;
