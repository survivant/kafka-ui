import { connect } from 'react-redux';
import { ClusterName, RootState } from 'redux/interfaces';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  getIsSchemaVersionFetched,
  getSchema,
  getSortedSchemaVersions,
  getIsSchemaListFetched,
} from 'redux/reducers/schemas/selectors';
import { fetchSchemaVersions, fetchSchemasByClusterName } from 'redux/actions';
import Details from './Details';

interface RouteProps {
  clusterName: ClusterName;
  subject: string;
}

type OwnProps = RouteComponentProps<RouteProps>;

const mapStateToProps = (
  state: RootState,
  {
    match: {
      params: { clusterName, subject },
    },
  }: OwnProps
) => ({
  subject,
  schema: getSchema(state, subject),
  versions: getSortedSchemaVersions(state),
  versionsAreFetched: getIsSchemaVersionFetched(state),
  schemasAreFetched: getIsSchemaListFetched(state),
  clusterName,
});

const mapDispatchToProps = {
  fetchSchemaVersions,
  fetchSchemasByClusterName,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);
