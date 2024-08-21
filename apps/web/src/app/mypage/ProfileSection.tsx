/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

export default function ProfileSection() {
  const { data } = useSession();

  const { data: userData } = useGetSuspenseUser();

  if (!data) return null;

  const { name, image } = data?.user;

  return (
    <Profile>
      <div className="profile-image">
        <img src={image} alt="profile" width={160} height={160} />
      </div>
      <p className="profile-name">{name}</p>
      <p className="point">Points: {addNumberComma(userData.points)}</p>
    </Profile>
  );
}

const Profile = styled.section`
  .profile-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .profile-name {
    color: #fff;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: #141414;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 56px */
    margin-top: 40px;
    margin-bottom: 30px;

    white-space: nowrap;
  }

  .point {
    color: #fff;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #141414;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 33.6px */
  }
`;
