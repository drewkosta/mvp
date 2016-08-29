class container extends React.Component {
  render () {
    return (
      <div>
        <navbar />
        <map />
      </div>
    )
  }
}

ReactDOM.render(<container />, document.getElementById('body'))