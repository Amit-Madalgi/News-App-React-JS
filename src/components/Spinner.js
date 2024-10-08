import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <div className="spinner-border" role="status">
            <span className="visually-hidden my-3">Loading...</span>
        </div>
      </div>
    )
  }
}
