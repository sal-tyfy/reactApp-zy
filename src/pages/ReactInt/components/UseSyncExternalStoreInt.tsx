import { Button, Card, Input, List, message, Modal } from 'antd';
import { useRef, useSyncExternalStore } from 'react';

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners: any[] = [];
const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};
const todoStore = {
  addTodo(text: string) {
    todos = [...todos, { text, id: nextId++ }];
    emitChange();
  },
  deleteTodo(id: number) {
    const index = todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    todos = [...todos];
    emitChange();
  },
  changeTodo(id: number, text: string) {
    const item = todos.find((item) => item.id === id);
    if (item) {
      item.text = text;
    }
    todos = [...todos];
    emitChange();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

export const UseSyncExternalStoreInt = () => {
  const addRef = useRef<HTMLInputElement | null>(null);
  const ref = useRef('');
  const list = useSyncExternalStore(todoStore.subscribe, todoStore.getSnapshot);
  return (
    <Card title="useSyncExternalStore基本用法">
      <div style={{ marginBottom: 24 }}>
        <input
          style={{ width: 300, marginRight: 24, height: 32 }}
          ref={addRef}
        />
        <Button
          type="primary"
          onClick={() => {
            if (addRef.current && addRef.current) {
              const val = addRef.current.value;
              if (val) {
                todoStore.addTodo(val);
                addRef.current.value = '';
              } else {
                message.warning('请输入');
              }
            }
          }}
        >
          add
        </Button>
      </div>
      {list.length > 0 && (
        <List bordered>
          {list.map((item) => {
            return (
              <List.Item key={item.id}>
                <div>
                  <span style={{ marginRight: 24 }}>{item.text}</span>
                  <Button
                    style={{ marginRight: 24 }}
                    onClick={() => {
                      ref.current = item.text;
                      Modal.confirm({
                        title: 'edit',
                        content: (
                          <Input
                            defaultValue={item.text}
                            style={{ width: 300 }}
                            onChange={(e) => {
                              ref.current = e.target.value;
                            }}
                          />
                        ),
                        onOk: (close) => {
                          if (ref.current !== '') {
                            todoStore.changeTodo(item.id, ref.current);
                            close();
                          } else {
                            message.warning('不能为空');
                          }
                        },
                      });
                    }}
                  >
                    edit
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      todoStore.deleteTodo(item.id);
                    }}
                  >
                    delete
                  </Button>
                </div>
              </List.Item>
            );
          })}
        </List>
      )}
    </Card>
  );
};
