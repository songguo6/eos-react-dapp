import React, { Component, Fragment } from 'react';
import { List, Avatar } from 'antd';

import * as bcUtils from '../../bc/bcUtils';
import * as utils from '../../common/utils';

class Detail extends Component {

  state = { 
    title: '',
    content: '',
    author: '',
    timestamp: 0,
  }

  componentDidMount(){
    bcUtils.eosTableRowById('article', this.props.match.params.id, async (res) => {
      const content = await bcUtils.readTextFromIPFS(res.content);
      this.setState({
        content,
        title: res.title,
        author: res.author,
        timestamp: res.timestamp,
      });
    });
  }

  render(){
    const { title, content, author, timestamp } = this.state;  

    return (
      <Fragment>
        <div className='article-title'>
          <h3>{title}</h3>
          <List.Item.Meta
            avatar={<Avatar src={utils.getRandomAvatar()} />}
            title={author}
            description={utils.getFormatTime(parseInt(timestamp))}
          />
        </div>
        <div dangerouslySetInnerHTML={{__html:content}}></div>
      </Fragment>
    );
  }
}

export default Detail;