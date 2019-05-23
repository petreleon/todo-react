import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  ButtonGroup,
  FormGroup,
  Input,
  Container,
  Collapse,
  Card,
  InputGroup
} from "reactstrap";
import FolderButtonElement from "./folderButtonElement.js";
import "./styles.css";

import TodoElement from "./card.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFoldersCollapse = this.toggleFoldersCollapse.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addHigh = this.addHigh.bind(this);
    this.addMedium = this.addMedium.bind(this);
    this.addLow = this.addLow.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.changePriority = this.changePriority.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.move1up = this.move1up.bind(this);
    this.move1down = this.move1down.bind(this);
    this.save = this.save.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.onChangeAddFolder = this.onChangeAddFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.changeToFolder = this.changeToFolder.bind(this);
    this.moveItemtoFolder = this.moveItemtoFolder.bind(this);

    if (localStorage.getItem("todo_newState") === null) {
      localStorage.setItem(
        "todo_newState",
        JSON.stringify({
          dataOfTodo: [
            {
              id: 1,
              title: "title1",
              description: "d12211",
              priority: "high",
              status: "Active"
            },
            {
              id: 3,
              title: "title2",
              description: "d12211",
              priority: "medium",
              status: "Active"
            },
            {
              id: 4,
              title: "title3",
              description: "eeewjnbw",
              priority: "medium",
              status: "Active"
            },
            {
              id: 5,
              title: "title5",
              description: "d122dhjdhd 11",
              priority: "low",
              status: "Active"
            }
          ],
          toAdd: {
            id: 6,
            title: "",
            description: "",
            priority: "",
            status: "Active"
          },
          modalEditor: {
            toEdit: false,
            index: 0
          },
          lastId: 0,
          toSearch: "",
          numberOfHighPriorityTasks: 1,
          numberOfTasks: 4,
          originalTaskPriority: "",
          foldersCollapse: false,
          folders: [],
          folderNametoAdd: ""
        })
      );
      localStorage.setItem("todo_folders", JSON.stringify(["default"]));
      localStorage.setItem(
        "todo_default",
        localStorage.getItem("todo_newState")
      );
      localStorage.setItem("todo_actual", "todo_default");
    }
    let newToDo = JSON.parse(
      localStorage.getItem(localStorage.getItem("todo_actual"))
    );
    this.state = {
      ...newToDo,
      folders: JSON.parse(localStorage.getItem("todo_folders")),
      actualFolder: localStorage.getItem("todo_actual")
    };
  }
  toggleFoldersCollapse() {
    this.setState(state => ({ foldersCollapse: !state.foldersCollapse }));
  }
  addItem(e) {
    e.preventDefault();
    let list = this.state.dataOfTodo;

    this.setState({
      toAdd: {
        ...this.state.toAdd,
        id: this.state.toAdd.id + 1
      }
    });
    this.setState({
      numberOfTasks: this.state.numberOfTasks + 1
    });
    if (this.state.toAdd.priority === "high") {
      list.splice(this.state.numberOfHighPriorityTasks, 0, this.state.toAdd);
      this.setState({
        numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks + 1
      });
    } else {
      list.splice(list.length, 0, this.state.toAdd);
    }

    this.setState({ dataOfTodo: list });
    document.getElementById("addTitle").value = "";
    document.getElementById("addText").value = "";
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        id: this.state.toAdd.id + 1,
        title: "",
        description: "",
        priority: ""
      }
    });
  }

  editItem(e) {
    e.preventDefault();
    let list = this.state.dataOfTodo;
    if (
      (this.state.toAdd.priority !== "high" &&
        this.state.originalTaskPriority !== "high") ||
      (this.state.toAdd.priority === "high" &&
        this.state.originalTaskPriority === "high")
    ) {
      list.splice(this.state.modalEditor.index, 1, this.state.toAdd);
    } else {
      if (this.state.toAdd.priority === "high") {
        list.splice(this.state.modalEditor.index, 1);
        list.splice(this.state.numberOfHighPriorityTasks, 0, this.state.toAdd);
        this.setState({
          numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks + 1
        });
      } else {
        list.splice(this.state.numberOfHighPriorityTasks, 0, this.state.toAdd);
        list.splice(this.state.modalEditor.index, 1);
        this.setState({
          numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks - 1
        });
      }
    }
    this.setState({ dataOfTodo: list });
    document.getElementById("addTitle").value = "";
    document.getElementById("addText").value = "";
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        id: this.state.lastId,
        title: "",
        description: "",
        priority: "",
        status: "Active"
      }
    });
    this.setState({
      modalEditor: {
        ...this.state.modalEditor,
        toEdit: false
      }
    });
  }

  deleteItem(index) {
    let list = this.state.dataOfTodo;
    this.setState({
      numberOfTasks: this.state.numberOfTasks - 1
    });
    if (this.state.dataOfTodo[index].priority === "high") {
      this.setState({
        numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks - 1
      });
    }
    list.splice(index, 1);
    this.setState({ dataOfTodo: list });
  }

  addHigh(e) {
    e.preventDefault();
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        priority: "high"
      }
    });
  }

  addMedium(e) {
    e.preventDefault();
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        priority: "medium"
      }
    });
  }

  addLow(e) {
    e.preventDefault();
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        priority: "low"
      }
    });
  }

  onChangeSearch(e) {
    this.setState({
      toSearch: e.target.value.toUpperCase()
    });
  }

  onChangeTitle(e) {
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        title: e.target.value
      }
    });
  }

  onChangeDescription(e) {
    this.setState({
      toAdd: {
        ...this.state.toAdd,
        description: e.target.value
      }
    });
  }

  changePriority(index, string) {
    let list = this.state.dataOfTodo;
    if (
      (list[index].priority === "high" && string === "high") ||
      (list[index].priority !== "high" && string !== "high")
    ) {
      list[index].priority = string;
    } else {
      let taskToEdit = list[index];
      taskToEdit.priority = string;
      if (string === "high") {
        list.splice(index, 1);
        list.splice(this.state.numberOfHighPriorityTasks, 0, taskToEdit);
        this.setState({
          numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks + 1
        });
      } else {
        list.splice(this.state.numberOfHighPriorityTasks, 0, taskToEdit);
        list.splice(index, 1);
        this.setState({
          numberOfHighPriorityTasks: this.state.numberOfHighPriorityTasks - 1
        });
      }
    }
    this.setState({
      dataOfTodo: list
    });
  }

  changeStatus(index, string) {
    let list = this.state.dataOfTodo;
    list[index].status = string;
    this.setState({
      dataOfTodo: list
    });
  }

  editAPost(index) {
    if (!this.state.modalEditor.toEdit) {
      this.setState({
        lastId: this.state.toAdd.id
      });
    }
    this.setState({
      modalEditor: {
        ...this.state.modalEditor,
        index: index,
        toEdit: true
      }
    });

    this.setState({
      toAdd: {
        ...this.state.dataOfTodo[index]
      }
    });

    this.setState({
      originalTaskPriority: this.state.dataOfTodo[index].priority
    });

    document.getElementById("addTitle").value = this.state.dataOfTodo[
      index
    ].title;
    document.getElementById("addText").value = this.state.dataOfTodo[
      index
    ].description;
  }

  move1up(index) {
    let list = this.state.dataOfTodo;
    let element1 = this.state.dataOfTodo[index - 1];
    let element2 = this.state.dataOfTodo[index];
    list.splice(index - 1, 2, element2, element1);
    this.setState({
      dataOfTodo: list
    });
  }

  move1down(index) {
    let list = this.state.dataOfTodo;
    let element1 = this.state.dataOfTodo[index];
    let element2 = this.state.dataOfTodo[index + 1];
    list.splice(index, 2, element2, element1);
    this.setState({
      dataOfTodo: list
    });
  }

  save(e) {
    e.preventDefault();
    localStorage.setItem(
      localStorage.getItem("todo_actual"),
      JSON.stringify(this.state)
    );
  }

  onChangeAddFolder(e) {
    this.setState({ folderNametoAdd: e.target.value });
  }

  addFolder() {
    if (localStorage.getItem("todo_" + this.state.folderNametoAdd) === null) {
      localStorage.setItem(
        "todo_" + this.state.folderNametoAdd,
        localStorage.getItem("todo_newState")
      );
      let folders = this.state.folders;
      folders.splice(folders.length, 0, this.state.folderNametoAdd);
      localStorage.setItem("todo_folders", JSON.stringify(folders));
      this.setState({ folders: folders });
      this.setState({ folderNametoAdd: "" });
      document.getElementById("addFolder").value = "";
    }
  }

  deleteFolder(index) {
    localStorage.removeItem("todo_" + this.state.folders[index]);
    let folders = this.state.folders;
    folders.splice(index, 1);
    localStorage.setItem("todo_folders", JSON.stringify(folders));
    this.setState({ folders: folders });
  }

  changeToFolder(index) {
    localStorage.setItem(this.state.actualFolder, JSON.stringify(this.state));
    localStorage.setItem("todo_actual", "todo_" + this.state.folders[index]);
    let state = JSON.parse(
      localStorage.getItem("todo_" + this.state.folders[index])
    );
    this.setState({
      ...state,
      folders: this.state.folders,
      actualFolder: "todo_" + this.state.folders[index],
      foldersCollapse: true
    });
    /*
    todo ensuring with input elements and their state elements to be ""
     */
  }

  moveItemtoFolder(indexItem, indexFolder) {
    let item = this.state.dataOfTodo[indexItem];
    let folder = JSON.parse(
      localStorage.getItem("todo_" + this.state.folders[indexFolder])
    );
    if (item.priority === "high") {
      folder.dataOfTodo.splice(folder.numberOfHighPriorityTasks, 0, item);
      folder.numberOfHighPriorityTasks = folder.numberOfHighPriorityTasks + 1;
    } else {
      folder.dataOfTodo.splice(folder.numberOfTasks, 0, item);
    }
    folder.numberOfTasks = folder.numberOfTasks + 1;
    localStorage.setItem(
      "todo_" + this.state.folders[indexFolder],
      JSON.stringify(folder)
    );
    this.deleteItem(indexItem);
  }

  render() {
    return (
      <div className="App">
        <Input
          id="search-bar"
          placeholder="search"
          onChange={this.onChangeSearch}
        />
        <h1>
          to do{" "}
          <ButtonGroup>
            <Button color="primary" onClick={this.save}>
              save
            </Button>
            <Button color="secondary" onClick={this.toggleFoldersCollapse}>
              folders
            </Button>
          </ButtonGroup>
        </h1>
        <Collapse isOpen={this.state.foldersCollapse}>
          <InputGroup>
            <Input
              id="addFolder"
              placeholder="create a folder"
              onChange={this.onChangeAddFolder}
            />
            <Button onClick={this.addFolder}>Add</Button>
          </InputGroup>
          <Card>
            {this.state.folders.map((folder, index) => (
              <FolderButtonElement
                foldername={folder}
                actualfoldername={this.state.actualFolder}
                deleteFolder={() => this.deleteFolder(index)}
                changeToFolder={() => this.changeToFolder(index)}
              />
            ))}
          </Card>
        </Collapse>

        <FormGroup>
          <Input
            name="title"
            id="addTitle"
            placeholder="title"
            onChange={this.onChangeTitle}
          />
          <Input
            type="textarea"
            name="text"
            id="addText"
            placeholder="description"
            onChange={this.onChangeDescription}
          />
          {/* <div>{JSON.stringify(this.state)}</div> */}
          <Container>
            <ButtonGroup className="btn-space">
              <Button color="danger" onClick={this.addHigh}>
                high
              </Button>
              <Button color="warning" onClick={this.addMedium}>
                medium
              </Button>
              <Button color="secondary" onClick={this.addLow}>
                low
              </Button>
            </ButtonGroup>
            {this.state.modalEditor.toEdit ? (
              <Button color="primary" onClick={this.editItem}>
                edit
              </Button>
            ) : (
              <Button color="primary" onClick={this.addItem}>
                add
              </Button>
            )}
          </Container>
        </FormGroup>
        {this.state.dataOfTodo.map(
          (todo, index) =>
            // Only do this if items have no stable IDs
            (this.state.toSearch === ""
              ? true
              : todo.title.toUpperCase().includes(this.state.toSearch) ||
                todo.description
                  .toUpperCase()
                  .includes(this.state.toSearch)) && (
              <TodoElement
                index={index}
                numberOfTasks={this.state.numberOfTasks}
                numberOfHighPriorityTasks={this.state.numberOfHighPriorityTasks}
                idofcard={todo.id}
                title={todo.title}
                description={todo.description}
                priority={todo.priority}
                status={todo.status}
                toSearch={this.state.toSearch}
                folders={this.state.folders}
                actualFolder={this.state.actualFolder}
                deleteItem={() => this.deleteItem(index)}
                changePrioritytoHigh={() => this.changePriority(index, "high")}
                changePrioritytoMedium={() =>
                  this.changePriority(index, "medium")
                }
                changePrioritytoLow={() => this.changePriority(index, "low")}
                changeStatustoCompleted={() =>
                  this.changeStatus(index, "Completed")
                }
                changeStatustoActive={() => this.changeStatus(index, "Active")}
                edit={() => this.editAPost(index)}
                move1up={() => this.move1up(index)}
                move1down={() => this.move1down(index)}
                moveItemtoFolder={indexFolder =>
                  this.moveItemtoFolder(index, indexFolder)
                }
              />
            )
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
