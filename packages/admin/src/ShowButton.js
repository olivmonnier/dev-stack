import React from 'react';
import { Button, translate } from 'react-admin';
import Visibility from '@material-ui/icons/Visibility';

const ShowButton = ({ record }) => (
  <Button color="primary" variant="flat" href={ record.url } target="_blank" label="ra.action.show">
    <Visibility />
  </Button>
)

export default translate(ShowButton);