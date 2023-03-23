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
  Space,
  Switch,
  DatePicker,
  Select,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

type ModalType = 'CREATE' | 'UPDATE';
const { RangePicker } = DatePicker;

const QuestionList = () => {
  const tableRef = useRef<ActionType>();
  const [userRoleOptions, setUserRoleOptions] = useState<Record<string, any>[]>(
    [],
  );
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('CREATE');
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  useEffect(() => {
    if (visible && modalType === 'UPDATE') {
      form.setFieldsValue(initialValues);
    }
  }, [visible]);
  const { run: assignRole } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysRole/doAssign', {
        method: 'post',
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('分配角色成功');
        tableRef.current?.reload();
      },
    },
  );
  const { run: addQuestion, loading: addQuestionLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysUser/save', {
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
  const { run: updateQuestion, loading: updateQuestionLoading } = useRequest(
    async (params) => {
      await request('/api/admin/system/sysUser/update', {
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
      await request(`/api/admin/system/sysUser/remove/${params}`, {
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
  const { run: updateStatus } = useRequest(
    async (params) => {
      await request(
        `/api/admin/system/sysUser/updateStatus/${params.id}/${params.status}`,
        {
          method: 'get',
        },
      );
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('更新状态成功');
        tableRef.current?.reload();
      },
    },
  );

  useEffect(() => {
    const getRole = async (params: number) => {
      const res = await request(
        `/api/admin/system/sysRole/toAssign/${params}`,
        {
          method: 'get',
        },
      );
      setUserRoleOptions(res.data.allRoleList || []);
      const assignRoleIdList = (res.data?.assignRoleList || []).map(
        (item: Record<string, any>) => item.id,
      );
      assignForm.setFieldsValue({ roleNameList: assignRoleIdList });
    };
    if (assignModalVisible && initialValues.id) {
      getRole(initialValues.id);
      assignForm.setFieldsValue({ ...initialValues, userId: initialValues.id });
    }
  }, [assignModalVisible]);
  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '岗位',
      dataIndex: 'post_id',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'dept_id',
      hideInSearch: true,
    },
    {
      title: '所属角色',
      dataIndex: 'post_id',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <Switch
            checked={record.status}
            onClick={() => {
              updateStatus({
                id: record?.id,
                status: String(record?.status) === '0' ? 1 : 0,
              });
            }}
          />
        );
      },
      hideInSearch: true,
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
                setInitialValues(record);
                setVisible(true);
              }}
            >
              修改
            </Button>
            <Button
              size="small"
              type="link"
              key="update"
              onClick={() => {
                setAssignModalVisible(true);
                setInitialValues(record);
              }}
            >
              分配角色
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
    {
      title: '关键字',
      dataIndex: 'keyWord',
      hideInTable: true,
    },
    {
      title: '起止时间',
      dataIndex: 'timeRange',
      hideInTable: true,
      renderFormItem: () => {
        return <RangePicker />;
      },
    },
  ];
  return (
    <PageContainer title="用户列表">
      <ProTable
        actionRef={tableRef}
        rowKey={'id'}
        scroll={{ x: 'max-content' }}
        columns={columns}
        request={async (params) => {
          const { current, pageSize, keyWord, timeRange } = params;
          const requestParam: Record<string, any> = {
            current,
            pageSize,
          };

          if (keyWord !== '' && keyWord !== undefined) {
            requestParam.keyword = keyWord;
          }
          if (
            Array.isArray(timeRange) &&
            timeRange[0] !== undefined &&
            timeRange[1] !== undefined
          ) {
            requestParam.createTimeBegin = timeRange[0];
            requestParam.createTimeEnd = timeRange[1];
          }
          const res = await request(
            `/api/admin/system/sysUser/${params.current}/${params.pageSize}`,
            {
              method: 'get',
              params: requestParam,
            },
          );
          return {
            data: res.data.records,
            success: res.success,
            total: res.data.total,
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
              创建
            </Button>,
          ];
        }}
      />
      <Modal
        destroyOnClose
        title="创建角色"
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
            const requestParams = { ...values };
            if (values.status === true || values.status === 1) {
              requestParams.status = 1;
            } else {
              requestParams.status = 0;
            }
            if (modalType === 'CREATE') {
              await addQuestion(requestParams);
            } else if (modalType === 'UPDATE') {
              await updateQuestion({ ...requestParams, id: initialValues.id });
            }
            setVisible(false);
          }}
        >
          <Form.Item
            name="username"
            label="用户名"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            required
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机"
            required
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Switch
              defaultChecked={false}
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={'分配角色'}
        destroyOnClose
        open={assignModalVisible}
        onCancel={() => {
          setAssignModalVisible(false);
        }}
        onOk={() => {
          assignForm.submit();
        }}
      >
        <Form
          preserve={false}
          onFinish={async (values) => {
            await assignRole({
              userId: values.userId,
              roleIdList: values.roleNameList,
            });
            setAssignModalVisible(false);
          }}
          form={assignForm}
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <Form.Item label="用户id" name="userId" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="用户名称" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="用户角色"
            name="roleNameList"
            required
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              options={userRoleOptions}
              fieldNames={{ label: 'roleName', value: 'id' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default QuestionList;
