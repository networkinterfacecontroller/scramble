import React from 'react';
const uuid = require('uuid/v4')
import { box } from 'tweetnacl';
import { encodeBase64 } from 'tweetnacl-util';

function Setup(props) {
  let keys = box.keyPair();
  props.setKeys(encodeBase64(keys.secretKey), encodeBase64(keys.publicKey))
  props.setIdentity(uuid());
  return 'All set!'
}

export default Setup;
