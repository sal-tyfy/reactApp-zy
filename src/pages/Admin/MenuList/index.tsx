import { DownOutlined, RightOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { request, useRequest } from '@umijs/max';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Switch,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

type ModalType = 'CREATE' | 'UPDATE' | 'CREATE_CHILDREN';

const QuestionList = () => {
  const tableRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (modalType === 'UPDATE') {
        form.setFieldsValue(initialValues);
      } else if (modalType === 'CREATE_CHILDREN' || modalType === 'CREATE') {
        form.setFieldsValue({ sortValue: 1 });
      }
    }
  }, [visible]);
  const { run: addMenu, loading: addMenuLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysMenu/save', {
        method: 'post',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('添加成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: updateMenu, loading: updateMenuLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysMenu/update', {
        method: 'put',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('修改成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: deleteQuestion, loading: deleteQuestionLoading } = useRequest(
    async (params) => {
      await request(`/api/admin/system/sysMenu/remove/${params}`, {
        method: 'delete',
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        tableRef.current?.reload();
      },
    },
  );

  const columns: ProColumns[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      hideInSearch: true,
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      hideInSearch: true,
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sortValue',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        return <Switch checked={String(record.status) === '1'} />;
      },
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
              key="add"
              onClick={() => {
                setModalType('CREATE_CHILDREN');
                setInitialValues(record);
                setVisible(true);
              }}
            >
              添加
            </Button>
            <Button
              size="small"
              type="link"
              key="update"
              onClick={() => {
                setModalType('UPDATE');
                setInitialValues(record);
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
              <Button
                danger
                size="small"
                type="link"
                key="delete"
                disabled={(record.children || []).length > 0}
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer title="菜单列表">
      <ProTable
        actionRef={tableRef}
        pagination={false}
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) => {
            if ((record.children || []).length === 0) {
              return null;
            } else {
              return expanded ? (
                <DownOutlined
                  style={{ marginRight: 8 }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <RightOutlined
                  style={{ marginRight: 8 }}
                  onClick={(e) => onExpand(record, e)}
                />
              );
            }
          },
        }}
        rowKey={'id'}
        scroll={{ x: 'max-content' }}
        columns={columns}
        headerTitle="菜单列表"
        search={false}
        request={async () => {
          const res = await request('/api/admin/system/sysMenu/findNodes', {
            method: 'get',
          });
          return {
            data: res.data,
            success: res.success,
          };
        }}
        options={false}
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
              添加
            </Button>,
          ];
        }}
      />
      <Modal
        destroyOnClose
        title="添加目录节点"
        open={visible}
        bodyStyle={{ paddingTop: 24, paddingBottom: 24 }}
        onCancel={() => {
          setVisible(false);
        }}
        okButtonProps={{
          loading: addMenuLoading || updateMenuLoading,
        }}
        cancelButtonProps={{
          disabled: addMenuLoading || updateMenuLoading,
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
              await addMenu(values);
            } else if (modalType === 'UPDATE') {
              await updateMenu({ ...values, id: initialValues.id });
            } else if (modalType === 'CREATE_CHILDREN') {
              await addMenu({ ...values, parentId: initialValues.id });
            }
            setVisible(false);
          }}
        >
          <Form.Item label="上级部门">
            <Input disabled />
          </Form.Item>
          <Form.Item label="菜单类型">
            <Radio.Group defaultValue={0} disabled>
              <Radio value={0}>目录</Radio>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="name"
            label="菜单名称"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="图标">
            <Input disabled />
          </Form.Item>
          <Form.Item label="排序" name="sortValue">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="路由地址" name="path">
            <Input />
          </Form.Item>
          <Form.Item label="状态">
            <Radio.Group defaultValue={0} disabled>
              <Radio value={0}>正常</Radio>
              <Radio value={1}>停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QuestionList;
