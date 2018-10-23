import React, { Component, SFC } from 'react';
import { Table } from 'antd';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ActionButtons } from './action-buttons';
import { format } from 'date-fns';
import { StyledEye, KeyContainer } from './table.css';

type TDateProps = {
  date: Date;
};

const Date: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;

type TKeyVisibilityProps = {
  entity: TApiKeyTableEntity;
};
type TKeyVisibilityState = {
  showKey: boolean;
};
class KeyVisibility extends Component<TKeyVisibilityProps, TKeyVisibilityState> {
  readonly state: TKeyVisibilityState = {
    showKey: false,
  };

  toggleKeyVisibility = () => {
    this.setState({
      showKey: !this.state.showKey,
    });
  };

  render() {
    const { entity } = this.props;
    const regExp = new RegExp('.', 'g');
    return (
      <KeyContainer>
        {this.state.showKey ? entity : entity.toString().replace(regExp, '*')}
        <StyledEye onClick={this.toggleKeyVisibility} type="eye" />
      </KeyContainer>
    );
  }
}

export type TTableProps = {
  data: TApiKeyTableEntity[];
  onRemove: (id: string) => void;
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export class ApiKeysTable extends Component<TTableProps> {
  handleRemove = (id: string) => () => {
    this.props.onRemove(id);
  };

  handleEdit = (id: string) => () => {
    //  this.props.onEdit(id);
  };

  getColumns() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Key',
        dataIndex: 'key',
        width: '35%',
        key: 'key',
        render: (entity: TApiKeyTableEntity) => <KeyVisibility entity={entity} />,
      },
      {
        title: 'Data Created',
        key: 'created',
        render: (entity: TApiKeyTableEntity) => <Date date={entity.created} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: TApiKeyTableEntity) => (
          <ActionButtons
            name={entity.name}
            onRemove={this.handleRemove(entity.id)}
            onEdit={this.handleEdit(entity.id)}
          />
        ),
      },
    ];
  }

  render() {
    const { data } = this.props;
    const columns = this.getColumns();

    return <Table pagination={false} columns={columns} dataSource={data} />;
  }
}
