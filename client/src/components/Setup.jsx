import React from 'react';
const uuid = require('uuid/v4')
import { box } from 'tweetnacl';
import { encodeBase64 } from 'tweetnacl-util';

function Setup(props) {
  let keys = box.keyPair();
  //keys are stored as base64 encoded strings so the public key can be shared as an attribute on chat User object
  props.setKeys(encodeBase64(keys.secretKey), encodeBase64(keys.publicKey))
  //uuid4 is random
  props.setIdentity(uuid());
  return 'All set!'
}

export default Setup;
