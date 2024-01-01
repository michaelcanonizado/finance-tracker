import React from "react";

import { getData } from "@/lib/getSheetsData";

const Home = async () => {
  const data = await getData();

  console.log(data);

  return (
    <div className="min-h-screen">
      USER DASHBOARD
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim
        semper nulla tristique tempus. Vestibulum id scelerisque elit, volutpat
        aliquet velit. Ut orci nibh, mattis at sem a, vulputate mollis libero.
        Fusce molestie mauris ac porttitor porttitor. Pellentesque iaculis dolor
        sit amet iaculis lacinia. Nam rhoncus rhoncus augue vitae mollis.
        Integer ut auctor arcu, malesuada ornare enim. Sed pretium orci tempus,
        pharetra lorem eu, fermentum magna. Curabitur mattis ultrices metus, a
        dignissim turpis dictum condimentum. Mauris in dapibus enim, in dapibus
        mi. Nam et convallis odio. Proin blandit non felis sed consequat.
        Praesent in auctor leo, sed tincidunt tellus. In rutrum odio eget arcu
        imperdiet, vel imperdiet tellus mattis. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Vivamus at sem
        in purus varius accumsan. Nam velit ligula, bibendum in metus eget,
        facilisis malesuada justo. Integer at est porttitor, volutpat mi at,
        posuere ex. Duis magna magna, consequat vitae feugiat sit amet, egestas
        et tortor. Praesent ipsum nibh, sagittis sit amet ex sed, rutrum egestas
        massa. Phasellus pharetra, ante ut vehicula porttitor, felis leo
        condimentum felis, at vestibulum lacus massa quis nibh. Nunc faucibus
        tempus purus id semper. Quisque tempor nulla ut sem elementum accumsan.
        Curabitur sit amet mi ipsum. Nulla facilisi. Vivamus ut nisl finibus
        risus congue laoreet eu at elit. Vestibulum efficitur mollis egestas.
        Maecenas accumsan, velit vitae auctor finibus, mi quam viverra nunc,
        quis pretium nisi risus at orci. Pellentesque vestibulum condimentum
        dolor quis congue. Proin eget fermentum eros. Duis est magna, egestas
        sit amet consectetur vitae, lobortis eu risus. Nunc ac ultricies turpis.
        Suspendisse nec sapien metus. Fusce euismod erat sed quam auctor
        vestibulum. Curabitur scelerisque ipsum dapibus sem maximus dictum. Nunc
        sed sapien sodales, mattis purus dignissim, finibus nibh. Cras hendrerit
        risus enim, id placerat massa fermentum eu. Morbi fermentum lobortis
        lacus vitae mollis. Praesent efficitur lorem et cursus gravida. Nam non
        sapien iaculis, sagittis massa in, molestie leo. Vestibulum mi orci,
        blandit vitae tortor nec, lacinia pharetra orci. Donec vitae lacus
        volutpat, dictum nisl vitae, tincidunt mi. Integer nisi nibh, malesuada
        sit amet nunc vitae, congue posuere sem. Donec pharetra suscipit
        consequat. Vivamus ultrices nibh nibh. Curabitur dignissim volutpat
        hendrerit. Nulla dapibus, metus vitae porta fermentum, massa ante
        placerat turpis, mollis tincidunt massa sem et justo. Aenean at odio in
        quam dapibus maximus. Pellentesque vel ante ipsum. Nulla tincidunt
        suscipit urna, ut eleifend nisl placerat nec. Nullam facilisis
        sollicitudin neque ut feugiat. In a iaculis sem. Nullam tortor enim,
        semper vel lacus eget, eleifend aliquam quam. Cras vehicula tristique ex
        ac auctor. Suspendisse quis magna tempus, porta nulla in, tempor est.
        Suspendisse tristique vulputate varius. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nam
        hendrerit arcu nibh, eu suscipit magna finibus sit amet.
      </p>
    </div>
  );
};

export default Home;
