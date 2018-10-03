import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import AutoSuggestInput from 'ra-input-autosuggest';
const choices = [
  { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
  { _id: 456, full_name: 'Jane Austen', sex: 'F' },
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
      <AutoSuggestInput source="test" choices={choices} optionText="full_name" optionValue="_id"/>
    </SimpleForm>
  </Create>
);