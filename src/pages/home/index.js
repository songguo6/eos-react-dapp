import React, { Component }from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';  

import * as actionCreator from '../../store/actionCreator';
import * as bcUtils from '../../bc/bcUtils'; 
import * as utils from '../../common/utils'; 

const count = 10;
let offset = 0;

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

  componentDidMount(){
    offset = 0;
    bcUtils.eosTableRows('article', offset, (res) => {
      this.setState({
        initLoading: false,
        data: res,
        list: res,
      });
    }, this.getCategoryObject());
  }

  getCategoryObject(){
    const path = this.props.location.pathname;
    if(path.startsWith('/category/')){
      return {category: parseInt(path.replace('/category/',''))}
    }
    return {};
  }

  onLoadMore = () => {
    offset += count;
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    bcUtils.eosTableRows('article', offset, (res) => {
      const data = this.state.data.concat(res);
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    }, this.getCategoryObject());
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
          <Link to={'/detail/'+item.id}>
            <List.Item
              key={item.id}
              actions={[
                <IconText type="star-o" text="0" />, 
                <IconText type="like-o" text={item.likenum} />, 
                <IconText type="message" text="0" />,
              ]}
              extra={<img width={272} height={168} alt="logo" src={bcUtils.ipfsUrl(item.cover)} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={utils.getRandomAvatar()} />}
                title={item.author}
                description={utils.getTimeUntilNow(item.timestamp)}
              />
              <h2>{item.title}</h2>
              <div>{item.summary}</div>
            </List.Item>
          </Link>
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