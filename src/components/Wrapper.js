import React, { useEffect, useState, useRef } from "react";
import DataTable from "data-table-v";
import { createApp } from "vue";

import { applyVueInReact } from "veaury";

const Basic = applyVueInReact(DataTable);

const Wrapper = () => {
  const vueRef = useRef(null);
  const [vueInstance, setVueInstance] = useState(undefined);

  //   useEffect(() => {
  //     debugger;
  //     // const app = createApp();
  //     // app.use(DataTable);
  //     // createApp(DataTable).mount("#app");
  //     async function createVueInstance() {
  //       debugger;
  //       setVueInstance(
  //         createApp({
  //           el: vueRef.current,
  //           components: { DataTable },
  //           render: function (h) {
  //             debugger;
  //             return h(DataTable, {});
  //           },
  //         })
  //       );
  //     }

  //     createVueInstance();

  //     // return () => {
  //     //   vueInstance?.$destroy();
  //     // };
  //   }, []);

  return (
    <div id="vue-component" ref={vueRef}>
      <Basic />
    </div>
  );
};

export default Wrapper;
