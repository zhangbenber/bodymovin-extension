import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Variables from '../../helpers/styles/variables'
import {
  getAnimationMessageCount
} from '../../helpers/reports/counter'
import Layer from './Layer'
import RowHeader from './components/RowHeader'

const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      backgroundColor: Variables.colors.gray,
      padding: '6px 2px',
      overflow: 'hidden',
    }
})

class Report extends React.Component {

  state = {
    isCollapsed: false,
  }

  toggleCollapse = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    })
  }

  buildHeader = () => {
    const messageCount = getAnimationMessageCount(this.props.report, this.props.renderers, this.props.messageTypes)
    return (
      <RowHeader
        name={'Animation Report'}
        isCollapsed={this.state.isCollapsed}
        messages={messageCount}
        toggleCollapse={this.toggleCollapse}
      />
    )
  }

  buildContent = () => {
    if (!this.state.isCollapsed) {
      return null
    }
    const layers = this.props.report.layers
    const assets = this.props.report.assets
    return (
      <div className={css(styles.layers)}>
        {layers.map((layer, index) => (
          <Layer
            key={index}
            layer={layer}
            assets={assets}
            renderers={this.props.renderers}
            messageTypes={this.props.messageTypes}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className={css(styles.wrapper)}>
        {this.buildHeader()}
        {this.buildContent()}
      </div>
      );
  }
}

export default Report
