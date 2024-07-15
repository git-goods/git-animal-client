import styled from 'styled-components';

import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

export default function ProfileSection() {
  const { data } = useGetSuspenseUser();

  const { username, profileImage, points } = data;

  return (
    <Profile>
      <div className="profile-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profileImage} alt="profile" width={160} height={160} />
      </div>
      <p className="profile-name">{username}</p>
      <p className="point">Points: {addNumberComma(points)}</p>
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
