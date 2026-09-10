-- 숲속의바다 관리자 콘텐츠 스키마
-- notices/events 는 홈 화면 공지·이벤트, settings 는 팝업 on/off 와 관리자 비밀번호 해시.

CREATE TABLE IF NOT EXISTS notices (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  content    TEXT NOT NULL DEFAULT '',
  date       TEXT NOT NULL DEFAULT '',
  important  INTEGER NOT NULL DEFAULT 0,
  active     INTEGER NOT NULL DEFAULT 1,
  sort       INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS events (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  period      TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  highlight   TEXT,
  conditions  TEXT NOT NULL DEFAULT '[]',   -- JSON 배열(문자열)
  badge       TEXT,
  color       TEXT NOT NULL DEFAULT '#4f8a8b',
  active      INTEGER NOT NULL DEFAULT 1,
  sort        INTEGER NOT NULL DEFAULT 0,
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 로그인 시도 제한(IP 별 실패 횟수·창)
CREATE TABLE IF NOT EXISTS login_attempts (
  ip           TEXT PRIMARY KEY,
  fail_count   INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL DEFAULT 0   -- epoch ms
);

INSERT OR IGNORE INTO settings (key, value) VALUES ('popup_enabled', '1');
