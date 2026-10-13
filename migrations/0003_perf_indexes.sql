-- 무료 읽기 한도(계정 전체 하루 500만 행) 보호용 색인.
-- /api/content 는 방문자 전원이 매 로드마다 호출 — WHERE active=1 조건에 색인이 없어
-- notices/events 전체를 매번 훑었다. 관리자 목록(색인 없음, WHERE 無)도 함께 커버.
-- 대상 표는 0001_init.sql 의 CREATE TABLE notices / CREATE TABLE events.

CREATE INDEX IF NOT EXISTS idx_notices_active_sort ON notices(active, sort, updated_at);
CREATE INDEX IF NOT EXISTS idx_notices_sort ON notices(sort, updated_at);

CREATE INDEX IF NOT EXISTS idx_events_active_sort ON events(active, sort, updated_at);
CREATE INDEX IF NOT EXISTS idx_events_sort ON events(sort, updated_at);
