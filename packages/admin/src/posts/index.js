import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import AutoSuggestInput from 'ra-input-autosuggest';
const choices = [
  { id: 123, name: 'Leo Tolstoi' },
  { id: 456, name: 'Jane Austen' },
];

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="title" />
      <RichTextInput source="resume" />
      <RichTextInput source="content" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="resume" />
      <RichTextInput source="content" />
      <AutoSuggestInput source="test" choices={choices} />
    </SimpleForm>
  </Create>
);