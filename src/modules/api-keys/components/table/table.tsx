import React, { Component, SFC } from 'react';
import { Table } from 'antd';
import { ActionButtons } from './action-buttons';
import { format } from 'date-fns';
import { StyledEye, KeyContainer } from './table.css';
import { ApiKeyModal } from '../../../../redux/api-keys/types';

type TDateProps = {
  date: Date;
};

const Date: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;

type TKeyVisibilityProps = {
  entity: ApiKeyModal;
};
type TKeyVisibilityState = {
  showKey: boolean;
};
export class KeyVisibility extends Component<TKeyVisibilityProps, TKeyVisibilityState> {
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
        {this.state.showKey ? entity.key : entity.key.replace(regExp, '*')}
        <StyledEye onClick={this.toggleKeyVisibility} type="eye" />
      </KeyContainer>
    );
  }
}

export type TTableProps = {
  data: ApiKeyModal[];
  onRemove: (id: string) => void;
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
        key: 'key',
        width: '35%',
        render: (entity: ApiKeyModal) => <KeyVisibility entity={entity} />,
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: ApiKeyModal) => <Date date={entity.created} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: ApiKeyModal) => (
          <ActionButtons
            apiKey={entity.key}
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
