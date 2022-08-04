// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
use tempfile::TempDir;

use sui_sdk::crypto::KeystoreType;

#[test]
fn mnemonic_test() {
    let temp_dir = TempDir::new().unwrap();
    let keystore_path = temp_dir.path().join("sui.keystore");
    let mut keystore = KeystoreType::File(keystore_path).init().unwrap();

    let (address, phrase) = keystore.generate_new_key().unwrap();

    let keystore_path_2 = temp_dir.path().join("sui2.keystore");
    let mut keystore2 = KeystoreType::File(keystore_path_2).init().unwrap();
    let imported_address = keystore2.import_from_mnemonic(&phrase).unwrap();

    assert_eq!(address, imported_address);
}
