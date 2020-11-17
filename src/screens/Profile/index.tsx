import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text, Container} from 'native-base';
import {StyleSheet} from 'react-native';

import {updateUser} from '../../actions/auth';
import {createFormData} from '../../utils/createFormData';

import ProfileForm from './components/ProfileForm';

import {IAuth, UserType, ImageType} from '../../types';

interface ProfileProps {
  user: UserType;
  updateUser: (data: FormData) => void;
}

const Profile: FC<ProfileProps> = ({user, updateUser}) => {
  const handleSubmit = (about: string | undefined, photo: ImageType) => {
    const data = createFormData(photo, about);

    updateUser(data);
  };

  return (
    <Container>
      <Text style={styles.greeting}>Welcome, {user.name}!</Text>
      <ProfileForm onSubmit={handleSubmit} user={user} />
    </Container>
  );
};

const mapStateToProps = ({auth}: {auth: IAuth}) => ({
  user: auth.user,
});

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, {updateUser})(Profile);
