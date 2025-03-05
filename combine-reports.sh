#!/bin/bash
while true; do
  chrome1_status=$(docker inspect -f '{{.State.Status}}' bat-playwright-tests-chrome1-1)
  chrome2_status=$(docker inspect -f '{{.State.Status}}' bat-playwright-tests-chrome2-1)

  if [[ "$chrome1_status" == "exited" && "$chrome2_status" == "exited" ]]; then
    chrome1_exit_code=$(docker inspect -f '{{.State.ExitCode}}' bat-playwright-tests-chrome1-1)
    chrome2_exit_code=$(docker inspect -f '{{.State.ExitCode}}' bat-playwright-tests-chrome2-1)

    if [[ "$chrome1_exit_code" -eq 0 && "$chrome2_exit_code" -eq 0 ]]; then

      echo "Chrome containers finished successfully. Combining reports..."
      allure generate /test/out/allure-results/chrome1 -o /results/allure-report/chrome1
      allure generate /test/out/allure-results/chrome2 -o /results/allure-report/chrome2
      allure generate /results/allure-report/chrome1 /results/allure-report/chrome2 -o /results/combined-allure-results
      echo "Allure reports combined successfully."
      break
    else
      echo "One or more chrome containers exited with an error. Exiting."
      break
    fi
  else
    echo "Waiting for chrome containers to finish..."
    sleep 30
  fi
done