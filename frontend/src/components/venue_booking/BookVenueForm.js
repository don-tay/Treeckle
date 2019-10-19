import React from "react";
import Axios from "axios";
import { Card, Form, Button, Confirm } from "semantic-ui-react";
import { Context } from "../../contexts/UserProvider";

const SUCCESS_MSG = "Booking request has been successfully made.";
const OVERLAP_CONFLICT_MSG = "The requested booking period is unavailable.";
const UNAUTHORIZED_MSG =
  "Unauthorized. Current session may have already expired.";
const UNKNOWN_ERROR_MSG =
  "An unknown error has occurred. Please visit subbash.com to resolve the issue.";

class BookVenueForm extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.onPurposeChange = this.onPurposeChange.bind(this);
    this.onSubmitting = this.onSubmitting.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.toggleConfirmation = this.toggleConfirmation.bind(this);
  }

  getInitialState() {
    const initialState = {
      confirming: false,
      purpose: "",
      success: false
    };
    return initialState;
  }

  // called when user leaves the page or when a booking is successfully made.
  resetState() {
    this.setState(this.getInitialState());
  }

  // all fields cannot be empty
  areValidFields() {
    return this.props.bookingPeriod && this.state.purpose;
  }

  onPurposeChange(event, { value }) {
    console.log("Booking purpose changed:", value);
    this.setState({ purpose: value });
  }

  async onSubmitting() {
    this.toggleConfirmation();
    this.props.toggleStatusBar(true);
  }

  handleOnSubmit() {
    this.onSubmitting()
      .then(() => {
        const data = {
          roomId: this.props.bookingPeriod.venue.roomId,
          description: this.state.purpose,
          start: this.props.bookingPeriod.start,
          end: this.props.bookingPeriod.end
        };
        Axios.post("api/rooms/bookings", data, {
          headers: { Authorization: `Bearer ${this.context.token}` }
        })
          .then(response => {
            console.log("POST response:", response);
            if (response.status === 200) {
              this.setState({ success: true });
              this.props.renderStatusBar(true, SUCCESS_MSG);
            }
          })
          .catch(({ response }) => {
            console.log("Error response:", response);
            var msg;
            switch (response.status) {
              case 400:
                msg = OVERLAP_CONFLICT_MSG;
                break;
              case 401:
                msg = UNAUTHORIZED_MSG;
                break;
              default:
                msg = UNKNOWN_ERROR_MSG;
            }
            this.props.renderStatusBar(false, msg);
          });
      })
      .then(() => {
        this.props.toggleStatusBar(false);
      });
  }

  toggleConfirmation() {
    this.setState({ confirming: !this.state.confirming });
  }

  render() {
    return (
      <Card raised style={{ margin: "0 0 1em 0" }}>
        <Card.Content style={{ flexGrow: 0 }}>
          <Card.Header textAlign="center">
            Book {this.props.bookingPeriod.venue.name}
          </Card.Header>
        </Card.Content>
        <Card.Content style={{ flexGrow: 0 }}>
          <Form>
            <Form.TextArea
              rows={8}
              label="Booking purpose"
              placeholder="Briefly describe the purpose for this booking..."
              onChange={this.onPurposeChange}
              disabled={this.state.success}
            />
          </Form>
        </Card.Content>
        <Card.Content style={{ flexGrow: 0 }}>
          <Button
            fluid
            disabled={!this.areValidFields() || this.state.success}
            onClick={this.toggleConfirmation}
          >
            Submit
          </Button>
          <Confirm
            open={this.state.confirming}
            onCancel={this.toggleConfirmation}
            onConfirm={this.handleOnSubmit}
            content="Confirm booking?"
            size="mini"
          />
        </Card.Content>
      </Card>
    );
  }
}

export default BookVenueForm;
