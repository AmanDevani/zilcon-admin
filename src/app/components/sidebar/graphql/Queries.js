import { gql } from '@apollo/client';

export const GET_WORKSPACES = gql`
  query workspaces($filter: WorkspacesFilterInput, $sort: WorkspacesSortInput) {
    workspaces(filter: $filter, sort: $sort) {
      count
      workspaces {
        id
        uuid
        isActive
        name
        description
        blurhash
        config
        permissions {
          key
          level
        }
      }
    }
  }
`;

export const GET_WORKSPACE = gql`
  query workspace($where: WorkspaceUniqueInput!) {
    workspace(where: $where) {
      id
      uuid
      isActive
      name
      description
      blurhash
      slug
      config
      permissions {
        key
        level
      }
    }
  }
`;

export const GET_WORKSPACES_APPS = gql`
  query workspaceApps(
    $filter: WorkspaceAppsFilterInput
    $sort: WorkspaceAppsSortInput
  ) {
    workspaceApps(filter: $filter, sort: $sort) {
      count
      workspaceApps {
        id
        uuid
        isActive
        name
        description
      }
    }
  }
`;

export const GET_WORKSPACES_APP = gql`
  query workspaceApp($where: WorkspaceAppUniqueInput!) {
    workspaceApp(where: $where) {
      id
      uuid
      isActive
      name
      description
      slug
      url
      typeKey
      customDomain
      domainStatus
      deployment {
        enabled
        status
      }
      domainVerificationRecords {
        name
        type
        value
      }
      config {
        key
        type
        value
        dataType
        fonts {
          style
          type
          weight
          font {
            id
            title
            url
          }
        }
        logos
      }
    }
  }
`;

export const GET_WORKSPACES_APPS_TYPES = gql`
  query workspaceAppTypes {
    workspaceAppTypes {
      image
      key
      name
    }
  }
`;

export const GET_WORKSPACE_SIGNED_URL = gql`
  query GetWorkspaceImageUploadSignedUrl(
    $data: GetWorkspaceImageUploadSignedUrlInput!
  ) {
    getWorkspaceImageUploadSignedUrl(data: $data) {
      key
      signedUrl
    }
  }
`;

export const GET_WORKSPACE_APP_SIGNED_URL = gql`
  query GetWorkspaceAppImageUploadSignedUrl(
    $data: GetWorkspaceAppImageUploadSignedUrlInput!
  ) {
    getWorkspaceAppImageUploadSignedUrl(data: $data) {
      signedUrl
      key
      platformId
    }
  }
`;

export const UPSERT_CUSTOM_DOMAIN = gql`
  mutation UpsertAppCustomDomain(
    $where: WorkspaceAppUniqueInput!
    $data: UpsertAppCustomDomainInput!
  ) {
    upsertAppCustomDomain(where: $where, data: $data) {
      message
    }
  }
`;

export const GET_APP_ROOT_DOMAIN = gql`
  query getApplicationRootDomain {
    getApplicationRootDomain
  }
`;
