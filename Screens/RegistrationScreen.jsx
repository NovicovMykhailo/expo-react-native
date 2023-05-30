import { View } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState } from "react";
const Registration = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View>
      <Input placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
      <Input placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
      <Input placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
          <Button title="Solid Button" style={{width: '50%'}} />
    </View>
  );
};
export default Registration;
