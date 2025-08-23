import { useState, useEffect } from 'react';
import { User } from './types';
import axios from 'axios';

export const useFetchUser = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/user`)).data;
      setUserProfile(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { userProfile, loading, error, fetchUser };
};