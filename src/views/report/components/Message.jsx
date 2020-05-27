import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Variables from '../../../helpers/styles/variables'
import errorIcon from '../../../assets/svg/error.svg'
import warningIcon from '../../../assets/svg/warning.svg'

const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      backgroundColor: Variables.colors.gray_lightest,
      color: Variables.colors.gray_more_darkest,
      fontSize: '14px',
      marginTop: '10px',
      overflow: 'hidden',
      padding: '6px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${Variables.colors.gray_more_darkest}`,
      paddingBottom: '4px',
    },
    icon: {
      width: '12px',
      height: '12px',
      marginRight: '4px',
    },
    renderers: {
      display: 'flex',
    },
    renderer: {
      paddingRight: '4px',
    },
    content: {
      paddingTop: '10px',
    }
})

class Message extends React.Component {

  icons = {
    error: errorIcon,
    warning: warningIcon,
  }
  labels = {
    error: 'Error',
    warning: 'Warning',
  }
  renderers = {
    android: 'Android',
    ios: 'iOS',
    web: 'web',
    skottie: 'Skottie',
  }

  buildIcon = type => (
    <img
      className={css(styles.icon)}
      src={this.icons[type]}
      alt={this.labels[type]}
    />
  )

  buildRenderers = renderers => (
    <div className={css(styles.renderers)}>
      {renderers.map((renderer, index) => 
        (<div key={renderer} className={css(styles.renderer)}>
          {index > 0 && <span> | </span>}
          {this.renderers[renderer]}
        </div>)
      )}
    </div>
  )

  buildHeader = () => (
    <div className={css(styles.header)}>
      {this.buildIcon(this.props.message.type)}
      {this.buildRenderers(this.props.message.renderers)}
    </div>
  )

  buildExpressionMessage = () => (
    <div>Expressions are not supported</div>
  )

  buildSepareteDimensionsMessage = () => (
    <div>Separate dimensions are not supported</div>
  )

  buildOrientAlongPathMessage = () => (
    <div>Orient along path is not supported</div>
  )

  builders = {
    expression: this.buildExpressionMessage,
    separateDimensions: this.buildSepareteDimensionsMessage,
    orientAlongPath: this.buildOrientAlongPathMessage,
  }

  buildMessage = builder => {
    if (this.builders[builder]) {
      return this.builders[builder]()
    } else {
      return null
    }
  }

  buildContent = () => (
    <div className={css(styles.content)}>
      {this.buildMessage(this.props.message.builder)}
    </div>
  )

  render() {
    console.log(this.props.message)
    return (
      <div className={css(styles.wrapper)}>
        {this.buildHeader()}
        {this.buildContent()}
      </div>
      );
  }
}

export default Message
