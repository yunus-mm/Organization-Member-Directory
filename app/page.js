'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import AddMemberModule from '../components/AddMemberModule';
import SearchModule from '../components/SearchModule';
import MembersModule from '../components/MembersModule';

export default function Home() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState('list');

  if (status === 'loading') {
    return <div style={{textAlign:'center',marginTop:100}}>Loading...</div>;
  }

  if (!session) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
        <h1 className="text-3xl font-bold" style={{marginBottom:32}}>Organization Member Directory</h1>
        <button className="btn" onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
    );
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
        <h1 className="text-3xl font-bold" style={{ marginBottom: 0, flex: 1 }}>Organization Member Directory</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={session.user.image} alt="avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
          <span style={{ fontWeight: 500 }}>{session.user.name}</span>
          <button className="btn" style={{ marginLeft: 8 }} onClick={() => signOut()}>Sign Out</button>
        </div>
      </header>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <button className="btn" style={{ background: tab==="add"?"#ffe082":"" }} onClick={()=>setTab('add')}>Add Member</button>
        <button className="btn" style={{ background: tab==="search"?"#ffe082":"" }} onClick={()=>setTab('search')}>Search</button>
        <button className="btn" style={{ background: tab==="list"?"#ffe082":"" }} onClick={()=>setTab('list')}>Member List</button>
      </div>
      <div>
        {tab === 'add' && <AddMemberModule />}
        {tab === 'search' && <SearchModule />}
        {tab === 'list' && <MembersModule />}
      </div>
    </div>
  );
}
