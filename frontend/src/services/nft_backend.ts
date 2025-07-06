export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({
    'principal' : IDL.Principal,
    'name' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'avatar_url' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Nat64,
  });
  const Result_User = IDL.Variant({ 'Ok' : User, 'Err' : IDL.Text });
  const Project = IDL.Record({
    'id' : IDL.Text,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'collaborators' : IDL.Vec(IDL.Text),
    'tracks' : IDL.Vec(IDL.Text),
    'nfts' : IDL.Vec(IDL.Text),
    'created_at' : IDL.Nat64,
    'updated_at' : IDL.Nat64,
  });
  const Result_Project = IDL.Variant({ 'Ok' : Project, 'Err' : IDL.Text });
  const TrackStatus = IDL.Variant({
    'Draft' : IDL.Null,
    'Recording' : IDL.Null,
    'Mixing' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const Track = IDL.Record({
    'id' : IDL.Text,
    'project_id' : IDL.Text,
    'name' : IDL.Text,
    'ipfs_hash' : IDL.Text,
    'duration' : IDL.Nat64,
    'status' : TrackStatus,
    'created_at' : IDL.Nat64,
  });
  const Result_Track = IDL.Variant({ 'Ok' : Track, 'Err' : IDL.Text });
  const NFT = IDL.Record({
    'id' : IDL.Text,
    'project_id' : IDL.Text,
    'creator' : IDL.Principal,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'price' : IDL.Opt(IDL.Nat64),
    'royalty_percentage' : IDL.Nat8,
    'metadata_uri' : IDL.Text,
    'token_id' : IDL.Opt(IDL.Text),
    'contract_address' : IDL.Opt(IDL.Text),
    'is_minted' : IDL.Bool,
    'is_listed' : IDL.Bool,
    'opensea_url' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Nat64,
    'updated_at' : IDL.Nat64,
  });
  const Result_NFT = IDL.Variant({ 'Ok' : NFT, 'Err' : IDL.Text });
  const Collaboration = IDL.Record({
    'id' : IDL.Text,
    'project_id' : IDL.Text,
    'user_principal' : IDL.Principal,
    'contribution_percentage' : IDL.Nat8,
    'role' : IDL.Text,
    'joined_at' : IDL.Nat64,
  });
  const Result_Collaboration = IDL.Variant({
    'Ok' : Collaboration,
    'Err' : IDL.Text,
  });
  const Result_Void = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  return IDL.Service({
    'add_collaborator' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Nat8, IDL.Text],
        [Result_Collaboration],
        [],
      ),
    'add_track' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat64],
        [Result_Track],
        [],
      ),
    'create_nft' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Nat64), IDL.Nat8, IDL.Text],
        [Result_NFT],
        [],
      ),
    'create_project' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text)],
        [Result_Project],
        [],
      ),
    'get_caller' : IDL.Func([], [IDL.Principal], ['query']),
    'get_canister_id' : IDL.Func([], [IDL.Principal], ['query']),
    'get_nft' : IDL.Func([IDL.Text], [Result_NFT], ['query']),
    'get_nfts' : IDL.Func([], [IDL.Vec(NFT)], ['query']),
    'get_project' : IDL.Func([IDL.Text], [Result_Project], ['query']),
    'get_project_collaborators' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Collaboration)],
        ['query'],
      ),
    'get_project_nfts' : IDL.Func([IDL.Text], [IDL.Vec(NFT)], ['query']),
    'get_project_tracks' : IDL.Func([IDL.Text], [IDL.Vec(Track)], ['query']),
    'get_projects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'get_user' : IDL.Func([], [Result_User], ['query']),
    'mint_nft' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_NFT], []),
    'register_user' : IDL.Func([IDL.Opt(IDL.Text), IDL.Text], [Result_User], []),
    'remove_collaborator' : IDL.Func([IDL.Text, IDL.Text], [Result_Void], []),
    'update_project' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [Result_Project],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };