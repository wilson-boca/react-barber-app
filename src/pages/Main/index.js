import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import { Container, Form, SubmitButton } from './styles';

// We can do it using this wat, OR
// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    loading: false,
    newRepo: '',
    repositories: [],
  };

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/wilson-boca/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repo"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading.toString()}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;

// This way, but using this way, I don't how to add state yet
// const Main = () => {
//   return (
//     <Container>
//       <h1>
//         <FaGithubAlt />
//         Repositories
//       </h1>

//       <Form onSubmit={() => {}}>
//         <input type="text" placeholder="Add repo" />
//         <SubmitButton>
//           <FaPlus size={14} />
//         </SubmitButton>
//       </Form>
//     </Container>
//   );
// };

// export default Main;
