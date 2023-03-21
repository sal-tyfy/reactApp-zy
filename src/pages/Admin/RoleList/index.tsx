import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import { Button, Form, Input, message, Modal, Popconfirm, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

type ModalType = 'CREATE' | 'UPDATE';

const QuestionList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const tableRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && modalType === 'UPDATE') {
      form.setFieldsValue(initialValues);
    }
  }, [visible]);
  const { run: addQuestion, loading: addQuestionLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysRole/save', {
        method: 'post',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('添加问题成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: updateQuestion, loading: updateQuestionLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysRole/update', {
        method: 'post',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('修改问题成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: deleteQuestion, loading: deleteQuestionLoading } = useRequest(
    async (params) => {
      await request(`/api/admin/system/sysRole/remove/${params}`, {
        method: 'delete',
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除问题成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: batchDeleteQuestion, loading: batchDeleteLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysRole/batchRemove', {
        method: 'post',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('批量删除问题成功');
        setSelectedRowKeys([]);
        tableRef.current?.reload();
      },
    },
  );
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: () => ({
      disabled: batchDeleteLoading,
    }),
  };
  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '问题',
      dataIndex: 'question',
      width: 300,
    },
    {
      title: '回答',
      dataIndex: 'answer',
      hideInSearch: true,
      width: 300,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Button
              size="small"
              type="link"
              key="update"
              onClick={() => {
                setModalType('UPDATE');
                setInitialValues({
                  question: record?.question,
                  answer: record?.answer,
                  id: record?.id,
                });
                setVisible(true);
              }}
            >
              修改
            </Button>
            <Popconfirm
              key="delete"
              title="确定要删除吗"
              cancelButtonProps={{
                disabled: deleteQuestionLoading,
              }}
              onConfirm={async () => {
                return await deleteQuestion(record.id);
              }}
            >
              <Button danger size="small" type="link" key="delete">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer title="问题列表">
      <ProTable
        actionRef={tableRef}
        rowKey={'id'}
        scroll={{ x: 'max-content' }}
        columns={columns}
        request={async (params) => {
          const res = await request(
            `/api/admin/system/sysRole/${params.current}/${params.pageSize}`,
            {
              method: 'post',
              query: {
                ...params,
              },
            },
          );
          return {
            data: res.data.records,
            success: res.success,
            total: res.data.total,
          };
        }}
        options={false}
        tableAlertOptionRender={() => {
          return (
            <div>
              <Popconfirm
                title="确定要批量删除吗"
                onConfirm={async () => {
                  return await batchDeleteQuestion(selectedRowKeys);
                }}
                cancelButtonProps={{
                  disabled: batchDeleteLoading,
                }}
              >
                <Button
                  size="small"
                  type="link"
                  danger
                  loading={batchDeleteLoading}
                >
                  批量删除
                </Button>
              </Popconfirm>
              <Button
                disabled={batchDeleteLoading}
                size="small"
                type="link"
                onClick={() => {
                  setSelectedRowKeys([]);
                }}
              >
                取消选择
              </Button>
            </div>
          );
        }}
        rowSelection={rowSelection}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="create"
              onClick={() => {
                setModalType('CREATE');
                setVisible(true);
              }}
            >
              创建
            </Button>,
          ];
        }}
      />
      <Modal
        destroyOnClose
        title="创建问题"
        open={visible}
        bodyStyle={{ paddingTop: 24, paddingBottom: 24 }}
        onCancel={() => {
          setVisible(false);
        }}
        okButtonProps={{
          loading: addQuestionLoading || updateQuestionLoading,
        }}
        cancelButtonProps={{
          disabled: addQuestionLoading || updateQuestionLoading,
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          preserve={false}
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            if (modalType === 'CREATE') {
              await addQuestion(values);
            } else if (modalType === 'UPDATE') {
              console.log(initialValues.id);
              await updateQuestion({ ...values, id: initialValues.id });
            }
            setVisible(false);
          }}
        >
          <Form.Item
            name="question"
            label="问题"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answer"
            label="回答"
            required
            rules={[{ required: true }]}
          >
            <Input.TextArea maxLength={200} showCount size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QuestionList;
