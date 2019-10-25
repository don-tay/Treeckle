import React from "react";
import Axios from "axios";
import { Context } from "../../contexts/UserProvider";
import { Button, Popup } from "semantic-ui-react";

class DeleteUserButton extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.togglePopup = this.togglePopup.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    const data = {
      email: this.props.email
    };
    Axios.delete("api/accounts", data, {
      headers: { Authorization: `Bearer ${this.context.token}` }
    })
      .then(response => {
        console.log("DELETE user", response);
        if (response.status === 200) {
          this.props.updateTable();
        }
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          this.context.resetUser();
        }
      });
  }

  togglePopup() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Popup
        trigger={
          <Button basic color="red" icon="close"/>
        }
        on="click"
        content={<Button color="red" content="Delete user" onClick={this.deleteUser}}
        position="bottom center"
        open={this.state.isOpen}
        onOpen={this.togglePopup}
        onClose={this.togglePopup}
      />
    );
  }
}

export default DeleteUserButton;
