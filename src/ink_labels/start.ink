-> start
=== start ===
{start && start: "I saw him. Only for a moment." }
"His real name was {start.learned_his_name: Franz|a secret}."
{start: "I saw him. Only for a moment. His real name was {start.learned_his_name: Franz|kept a secret}." | [ Loop ] -> start }
{start: "Letter: {a|b|{start: {c|d}}}" }
{learned_his_name: "OK" | -> learned_his_name }
{learned_his_name: "OK" | -> END }
+ [ Loop ] -> start
+ [ learned_his_name ] -> learned_his_name
+ [ Exit ] -> END

= learned_his_name
learned_his_name
-> start