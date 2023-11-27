export const tableData = [
  { id: 1, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 2, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 3, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 4, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 5, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 6, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 7, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 8, title2: 119, title3val1: 24, title3val2: 21, max: 24.0, min: 3 },
  { id: 9, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 },
  { id: 10, title2: 159, title3val1: 24, title3val2: 24, max: 4.0, min: 1 }
];

export const matchTestDummy = [
  {
    version: "0.0.1",
    language_tag: "ko",
    timestamp: 1672531200,
    meta: {
      total_count: 7,
      max_phase: 3
    },
    data: [
      {
        id: 100000001,
        schedule_name: "최강자 토너먼트",
        total_phase: 3,
        instance_started_at: "2023-04-01",
        is_suspended: null,
        is_deleted: null,
        total_participant_count: 250,
        join_count: 0,
        jumped_in_count: 0,
        progress_count: 50,
        done_count: 200,
        need_count: 10,
        phases: [
          {
            phase: 3, // 1
            phase_room_count: 8,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 0
          },
          {
            phase: 2, // 1
            phase_room_count: 8,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 100
          },
          {
            phase: 1, // 1
            phase_room_count: 8,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 100
          }
        ]
      },
      {
        id: 100000002,
        schedule_name: "최강자 토너먼트2",
        total_phase: 3,
        instance_started_at: "2023-04-01",
        is_suspended: null,
        is_deleted: null,
        total_participant_count: 10,
        join_count: 0,
        jumped_in_count: 0,
        progress_count: 0,
        done_count: 0,
        need_count: 10,
        phases: [
          {
            phase: 1,
            phase_room_count: 5,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 0
          },
          {
            phase: 2,
            phase_room_count: 5,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 0
          },
          {
            phase: 3,
            phase_room_count: 20,
            status: "wait",
            done_room_count: 0,
            wait_room_count: 1,
            jumped_in_count: 0,
            jumped_in_info_count: 0
          }
        ]
      }
    ]
  }
];
