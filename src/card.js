import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ButtonGroup,
  Container,
  CardSubtitle,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";

class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div
            style={
              this.props.status === "Completed"
                ? { "text-decoration": "line-through" }
                : {}
            }
          >
            <CardTitle>{this.props.title}</CardTitle>
            <CardSubtitle>
              Priority: {this.props.priority}
              <br />
              status:{this.props.status}
            </CardSubtitle>
            <CardText>{this.props.description}</CardText>
          </div>
          <Container>
            <ButtonGroup className="btn-space">
              <Button color="danger" onClick={this.props.changePrioritytoHigh}>
                high
              </Button>
              <Button
                color="warning"
                onClick={this.props.changePrioritytoMedium}
              >
                medium
              </Button>
              <Button
                color="secondary"
                onClick={this.props.changePrioritytoLow}
              >
                low
              </Button>
            </ButtonGroup>

            <ButtonGroup className="btn-space">
              <Button color="primary" onClick={this.props.edit}>
                edit
              </Button>
              <Button color="danger" onClick={this.props.deleteItem}>
                delete
              </Button>
              {this.props.status === "Active" ? (
                <Button
                  color="success"
                  onClick={this.props.changeStatustoCompleted}
                >
                  Mark as completed
                </Button>
              ) : (
                <Button color="dark" onClick={this.props.changeStatustoActive}>
                  Mark as active
                </Button>
              )}
            </ButtonGroup>
            {this.props.toSearch === "" &&
              (this.props.index > this.props.numberOfHighPriorityTasks ||
                (this.props.index >= this.props.numberOfHighPriorityTasks &&
                  this.props.index < this.props.numberOfTasks - 1)) && (
                <ButtonGroup className="btn-space">
                  {this.props.index > this.props.numberOfHighPriorityTasks && (
                    <Button color="primary" onClick={this.props.move1up}>
                      up
                    </Button>
                  )}
                  {this.props.index >= this.props.numberOfHighPriorityTasks &&
                    this.props.index < this.props.numberOfTasks - 1 && (
                      <Button color="secondary" onClick={this.props.move1up}>
                        down
                      </Button>
                    )}
                </ButtonGroup>
              )}

            {this.props.folders.length > 1 && (
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle caret>Move to</DropdownToggle>
                <DropdownMenu>
                  {this.props.folders.map((folder, indexOfFolder) => (
                    <div>
                      {"todo_" + folder !== this.props.actualFolder && (
                        // <DropdownItem>
                        <Button
                          onClick={() =>
                            this.props.moveItemtoFolder(indexOfFolder)
                          }
                          block
                        >
                          {folder}
                        </Button>
                        // </DropdownItem>
                      )}
                    </div>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}
export default TodoElement;
