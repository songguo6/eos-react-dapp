import React, { Component }from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Button, Icon } from 'antd';

import * as actionCreator from '../../store/actionCreator';
import * as bcUtils from '../../bc/bcUtils'; 
import * as utils from '../../common/utils'; 

const count = 20;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Home extends Component {

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  }

  componentWillMount(){
    this.props.changeLayoutBackground();
  }

  componentDidMount() {
    bcUtils.eosTableRows('article', (res) => {
      this.setState({
        initLoading: false,
        data: res,
        list: res,
      });
    });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    bcUtils.eosTableRows('article', (res) => {
      const data = this.state.data.concat(res);
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.onLoadMore}>加载更多</Button>
      </div>
    ) : null;

    return (
      <List
        itemLayout='vertical'
        size='large'
        className="loadmore-list"
        loading={initLoading}    
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item.id}
            href='/detail'
            actions={[
              <IconText type="star-o" text="0" />, 
              <IconText type="like-o" text={item.likenum} />, 
              <IconText type="message" text="0" />,
            ]}
            extra={<img width={272} height={180} alt="logo" src={bcUtils.ipfsUrl(item.cover)} />}
          >
            <List.Item.Meta
              avatar={<Avatar src='/pics/eos.jpg' />}
              title={<a href="#avatar">{item.author}</a>}
              description={utils.getTimeUntilNow(item.timestamp)}
            />
            <h2>{item.title}</h2>
            <div>{item.summary}</div>
          </List.Item>
        )}
      />
    );
  }
}

const mapDispatch = (dispatch) => ({
  changeLayoutBackground(){
    dispatch(actionCreator.changeLayoutBackground('white'));
  },
});

export default connect(null, mapDispatch)(Home);