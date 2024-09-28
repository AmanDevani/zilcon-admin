import { gql } from '@apollo/client';

export const CREATE_WORKSPACE = gql`
  mutation createWorkspace($data: CreateWorkspaceInput!) {
    createWorkspace(data: $data) {
      message
      workspace {
        id
        uuid
        permissions {
          key
          level
        }
        name
        config
      }
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation updateWorkspace(
    $data: UpdateWorkspaceInput!
    $where: WorkspaceUniqueInput!
  ) {
    updateWorkspace(data: $data, where: $where) {
      message
    }
  }
`;

export const CREATE_APP = gql`
  mutation createWorkspaceApp($data: CreateWorkspaceAppInput!) {
    createWorkspaceApp(data: $data) {
      message
      workspaceApp {
        id
        uuid
        name
      }
    }
  }
`;

export const UPDATE_APP = gql`
  mutation updateWorkspaceApp(
    $data: UpdateWorkspaceAppInput!
    $where: WorkspaceAppUniqueInput!
  ) {
    updateWorkspaceApp(data: $data, where: $where) {
      message
    }
  }
`;

export const RETRY_APP_DEPLOYMENT = gql`
  mutation RetryAppDeployment(
    $where: WorkspaceAppUniqueInput!
    $data: RetryAppDeploymentInput
  ) {
    retryAppDeployment(where: $where, data: $data) {
      message
    }
  }
`;

export const VERIFY_APP_CUSTOM_DOMAIN = gql`
  mutation VerifyAppCustomDomain($where: WorkspaceAppUniqueInput!) {
    verifyAppCustomDomain(where: $where) {
      message
    }
  }
`;
