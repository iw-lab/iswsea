-- 자동 생성: node scripts/gen-seed.mjs (원본 = src/data/pension.ts). 이미 있는 id 는 건드리지 않는다.
INSERT OR IGNORE INTO notices (id,title,content,date,important,active,sort) VALUES ('popup-2026-09','태안 숲속의바다펜션 안내 (입/퇴실시간, 브런치와 웰컴 무료, 할인, 이벤트)','■ 입실 / 퇴실 시간 안내
[입실 시간] 오후 3시 이후, 연휴와 성수기는 오후 4시 이후
[퇴실 시간] 오전 11시 이전, 비수기 평일 12시 퇴실 이벤트 (퇴실 기준 월~금요일, 휴일 ×)
* 비수기와 준성수기는(연휴 ×) 유료 1만원 1시간 이내 조기 입실이 가능합니다.

■ 웰컴 서비스
컵라면, 과자, 음료, 생수(500ml) 중 1인당 1개씩 입실하실 때 숲속의바다 관리실 겸 매점에서 드립니다.

■ 브런치 무료 서비스 (샌드위치와 주스)
아침 9시쯤 완료 문자 드리면 9시 30분까지 숲속의바다 매점 겸 관리실에서 가져가신 후 객실이나 가시는 차 안에서 편하게 드시면 됩니다. (샌드위치와 주스 종류는 재료 수급 상황에 따라 변경될 수 있습니다.)

■ 비수기 평일 연박 할인 이벤트 (입실 기준 월요일~수요일 2박 3일, 휴일 ×)
(펜션 직접 예약 시 041-675-1222) 비수기 평일 연박 2일째 객실 요금 50% 할인해 드립니다.
* 예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다.

■ 연박 할인 이벤트
(펜션 직접 예약 시 041-675-1222) 객실 요금 2박 3일 15% / 3박 4일 ~ 4박 5일 20% / 5박 6일 이상 25% 할인됩니다.
* 예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다.

■ 동절기(11월~3월), 평일(일~목) 10% 객실 요금 할인 이벤트
금요일 ~ 토요일, 휴일은 제외됩니다.

■ 재방문 이벤트 (감태)
이원 감태 특산품은 회와 같이 드시면 맛있습니다.

■ 오션뷰 워터슬라이드 야외 수영장 운영 안내
6월 말부터 9월 초까지, 아침 10시~저녁 7시까지, 가로 20m, 세로 5m, 수심 1.2m
운영시간, 운영기간은 변경될 수 있습니다. 자세한 사항은 야외 수영장 공지를 참고하세요.','2026.09.08',1,1,0);
INSERT OR IGNORE INTO notices (id,title,content,date,important,active,sort) VALUES ('winter-discount','동절기 (11월 ~ 3월), 주중 (일요일 ~ 목요일) 10% 객실 요금 할인 이벤트','● 동절기 (11월 ~ 3월), 주중 (일요일 ~ 목요일) 10% 객실 요금 할인 이벤트 ●

(금요일 ~ 토요일, 휴일은 제외됩니다.)','2025.11.18',0,1,1);
INSERT OR IGNORE INTO notices (id,title,content,date,important,active,sort) VALUES ('late-checkout','비수기 평일 12시까지 퇴실 이벤트 (퇴실 기준 월요일-금요일)','● 비수기 평일 12시까지 퇴실 이벤트 (퇴실 기준 월요일-금요일) ●

- 성수기, 퇴실 기준 토요일 ~ 일요일, 휴일은 제외됩니다.
- 퇴실하실 때 방 열쇠는 관리실 앞에 있는 바구니에 반납 부탁드립니다.','2025.11.18',0,1,2);
INSERT OR IGNORE INTO notices (id,title,content,date,important,active,sort) VALUES ('pool-guide','워터 슬라이드 야외 수영장 이용 안내','● 워터 슬라이드 야외 수영장 이용 안내
▷ 운영 일자 : 6월 27일 ~ 8월 24일까지
▷ 운영 시간 : 10시 ~ 19시까지 (19시 ~ 10시까지 수영장 청소 시간)
▷ 수심 : 1.2m
▷ 복장 : 수영복

● 수영장 이용 시 유의사항
▷ 어린이는 반드시 보호자 동반 시 이용이 가능합니다.
▷ 아이들의 안전한 물놀이를 위해 보호자께서는 세심한 주의를 기울여 주시길 바랍니다.','2023.06.05',1,1,3);
INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES ('late-checkout','비수기 평일 12시 퇴실 이벤트','퇴실 기준 월요일 ~ 금요일','비수기 평일에는 다음날 12시까지 여유롭게 퇴실하실 수 있습니다.','퇴실 12시','["퇴실 기준 토요일~일요일, 휴일, 준성수기, 성수기는 제외됩니다.","퇴실하실 때 방 열쇠는 관리실 앞 바구니에 반납 부탁드립니다."]','평일','#c8a97e',1,0);
INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES ('weekday-2nights','비수기 평일 연박 할인 이벤트','입실 기준 월요일 ~ 수요일 · 2박 3일 · 휴일 ×','펜션 직접 예약 시(041-675-1222) 비수기 평일 연박 2일째 객실 요금을 50% 할인해 드립니다.','2일째 50% 할인','["펜션 직접 예약(041-675-1222)에 한합니다.","예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다."]','연박','#4f8a8b',1,1);
INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES ('long-stay','연박 할인 이벤트','2박 이상','펜션 직접 예약 시(041-675-1222) 객실 요금 2박 3일 15% / 3박 4일 ~ 4박 5일 20% / 5박 6일 이상 25% 할인됩니다.','최대 25% 할인','["펜션 직접 예약(041-675-1222)에 한합니다.","예약 취소 시 규정에 따라 수수료가 부과될 수 있습니다."]','연박','#4f8a8b',1,2);
INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES ('winter-10','동절기 평일 10% 객실 요금 할인 이벤트','11월 ~ 3월 · 주중(일요일 ~ 목요일)','동절기 주중(일~목) 예약 시 객실 요금 10% 할인 혜택을 드립니다.','10% 할인','["금요일 ~ 토요일, 휴일은 제외됩니다."]','동절기','#5b7db1',1,3);
INSERT OR IGNORE INTO events (id,title,period,description,highlight,conditions,badge,color,active,sort) VALUES ('revisit-gamtae','재방문 이벤트 (감태)','재방문 고객','이원 감태 특산품은 회와 같이 드시면 맛있습니다. 다시 찾아주신 분께 이원 감태를 드립니다.','이원 감태 증정','[]','재방문','#6f9a5b',1,4);
